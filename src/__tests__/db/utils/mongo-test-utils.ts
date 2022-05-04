import {
  MongoConnection,
  mongoConnection
} from '../../../mongo/mongo-connection'

export function connectToMongoTestDb(dbName?: string) {
  const workerId = process.env.JEST_WORKER_ID || 1

  dbName = dbName || `test_db_${workerId}`

  const port = process.env.MONGO_PORT
  const uri = `mongodb://localhost:${port}`

  return mongoConnection(uri, dbName)
}

export async function seedMongoUsers(connection: MongoConnection) {
  const result = await connection.db.collection('users').insertMany([
    { name: 'Ivan', lastName: 'Bambino', email: 'ivan@example.com' },
    { name: 'Mario', lastName: 'Markoni', email: 'mario@example.com' },
    { name: 'Bruno', lastName: 'Brunoti', email: 'bruno@example.com' }
  ])

  return result
}
