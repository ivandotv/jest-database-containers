import { Pool } from 'pg'
import { PostgresRepository } from '../../postgres/postgres-repository'
import {
  connectToTestDatbase,
  resetDatabase,
  seedDatabase
} from './utils/postgres-test-utils'

let connection: Pool

describe('Postgres', () => {
  beforeAll(async () => {
    connection = await connectToTestDatbase()
  })

  beforeEach(async () => {
    await seedDatabase(connection)
  })

  afterEach(async () => {
    //reset database
    await resetDatabase(connection)
  })

  afterAll(async () => {
    await connection.end()
  })

  test('Get user by email', async () => {
    const email = 'ivan@example.com'
    const repository = new PostgresRepository(connection)
    const user = await repository.getUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  test('Create user', async () => {
    const user = {
      email: 'new_user@example.com',
      name: 'New Guy',
      lastName: 'Rookie'
    }
    const repository = new PostgresRepository(connection)
    const createdUser = await repository.createUser(user)

    const queryUser = await repository.getUserByEmail(user.email)

    expect(createdUser?.email).toEqual(user.email)
    expect(queryUser?.email).toEqual(createdUser?.email)
  })

  test('Count users', async () => {
    const repository = new PostgresRepository(connection)
    const users = await repository.getAllUsers()

    //3 users from initial seed
    expect(users).toHaveLength(3)
  })
})
