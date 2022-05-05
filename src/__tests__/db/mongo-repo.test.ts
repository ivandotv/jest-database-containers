import { MongoConnection } from '../../mongo/mongo-connection'
import { MongoRepository } from '../../mongo/mongo-repository'
import { connectToMongoTestDb, seedDatabase } from './utils/mongo-test-utils'

let connection: MongoConnection

describe('Mongo Repository', () => {
  beforeAll(async () => {
    connection = await connectToMongoTestDb()
  })

  beforeEach(async () => {
    //seed the db
    await seedDatabase(connection)
  })
  afterEach(async () => {
    //drop the db
    await connection.db.dropDatabase()
  })

  afterAll(async () => {
    //close connection to the database
    await connection.client.close()
  })

  test('Get user by email', async () => {
    const repository = new MongoRepository(connection)
    const email = 'ivan@example.com'

    const user = await repository.getUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  test('Create user', async () => {
    const repository = new MongoRepository(connection)
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

  test('Count users', async () => {
    const repository = new MongoRepository(connection)

    const allUsers = await repository.getAllUsers()

    //3 users from initial seed
    expect(allUsers).toHaveLength(3)
  })
})
