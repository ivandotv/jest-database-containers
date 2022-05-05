import { Pool, PoolConfig } from 'pg'

export async function postgresConnection(config: PoolConfig) {
  return new Pool(config)
}
