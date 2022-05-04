import { Db, DbOptions, MongoClient, MongoClientOptions } from 'mongodb'

export type MongoConnection = { client: MongoClient; db: Db }

export async function mongoConnection(
  uri: string,
  dbName: string,
  opts?: MongoClientOptions,
  dbOpts?: DbOptions
) {
  const client = await MongoClient.connect(uri, opts!)

  const db = client.db(dbName, dbOpts!)

  return {
    client,
    db
  }
}
