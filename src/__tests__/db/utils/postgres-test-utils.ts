import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Pool, PoolConfig } from 'pg'
import { postgresConnection } from '../../../postgres/postgres-connection'

let seedFile: string
const testDbName = `TEST_DB_${process.env.JEST_WORKER_ID}`

export async function createTestDatabase() {
  const connectionConfig: PoolConfig = {
    host: 'localhost',
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
  }

  const connection = await postgresConnection(connectionConfig)

  await connection.query(`CREATE DATABASE ${testDbName}`)
  await connection.end()
}

export async function connectToTestDatbase() {
  //in watch mode run only once
  if (process.env.JEST_FIRST_RUN === 'yes') {
    await createTestDatabase()
  }

  const connectionConfig: PoolConfig = {
    host: 'localhost',
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT)
  }

  return postgresConnection(connectionConfig)
}

export async function seedDatabase(client: Pool) {
  if (!seedFile) {
    //load seed file only once
    seedFile = await readFile(resolve(__dirname, './seed.sql'), {
      encoding: 'utf8'
    })
  }
  await client.query(seedFile)
}

export async function resetDatabase(client: Pool) {
  // truncate all tables in the database
  // https://stackoverflow.com/a/12082038/1489487
  await client.query(`
      DO
      $func$
      BEGIN
        EXECUTE (
          SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
            FROM pg_class
            WHERE relkind = 'r'
            AND relnamespace = 'public'::regnamespace
        );
      END
      $func$;
    `)
}
