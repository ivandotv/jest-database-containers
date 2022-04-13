import { MongoUserRepository } from '../../../src/mong-user-repository'
import { MongoConnection } from '../../../src/mongo-connection'
import { connectToMongoTestDb, seedMongoUsers } from './utils/mongo-test-utils'

let connection: MongoConnection

describe('Mongo Repository test', () => {
  beforeAll(async () => {
    connection = await connectToMongoTestDb()
  })

  beforeEach(async () => {
    await seedMongoUsers(connection)
  })
  afterEach(async () => {
    //drop db
    await connection.db.dropDatabase()
  })

  afterAll(() => {
    //close connection to the database
    connection.client.close()
  })

  test('Get user by email', async () => {
    const repository = new MongoUserRepository(connection)
    const email = 'ivan@example.com'

    const user = await repository.getUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  test('Create user', async () => {
    const repository = new MongoUserRepository(connection)
    const newUser = {
      name: 'Johhny',
      lastName: 'Bravo',
      email: 'johhny@example.com'
    }

    const user = await repository.createUser(newUser)
    const returnedUser = await repository.getUserByEmail(newUser.email)

    expect(user).toBeTruthy()
    expect(returnedUser?.name).toBe(newUser.name)
    expect(returnedUser?.lastName).toBe(newUser.lastName)
  })
})
