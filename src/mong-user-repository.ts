import { Db, MongoClient } from 'mongodb'
import { MongoConnection } from './mongo-connection'

export type User = {
  name: string
  lastName: string
  email: string
}
export class MongoUserRepository {
  client: MongoClient

  db: Db

  constructor({ client, db }: MongoConnection) {
    this.client = client
    this.db = db
  }

  async getUserByEmail(email: string) {
    return this.db.collection<User>('users').findOne({ email })
  }

  async createUser(user: { name: string; lastName: string; email: string }) {
    return this.db.collection<User>('users').insertOne(user)
  }
}
