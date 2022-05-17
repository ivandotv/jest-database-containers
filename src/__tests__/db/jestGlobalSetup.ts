import { type } from 'os'
import { GenericContainer } from 'testcontainers'
import timeSpan from 'time-span'

global.containers = []

let firstRun = true

export default async (_config: any) => {
  process.env.JEST_FIRST_RUN = firstRun ? 'yes' : 'no'

  if (firstRun) {
    console.log('\nsetup started')
    const end = timeSpan()

    const mongoContainer = initializeMongo()
    const postgresContainer = initializePostgres()

    const startedContainers = await Promise.all([
      mongoContainer,
      postgresContainer
    ])

    global.containers.push(...startedContainers)

    console.log(`setup done in: ${end.seconds()} seconds`)
  }

  firstRun = false
}

async function initializeMongo() {
  const mongoContainer = new GenericContainer('mongo:5.0.7').withExposedPorts(
    27017
  )

  if (type() === 'Linux') {
    console.log('mongo: using tmpfs mount')
    mongoContainer.withTmpFs({ '/data/db': '' })
  }

  const mongoStarted = await startContainer(mongoContainer, 'mongo')

  process.env.MONGO_PORT = mongoStarted.getMappedPort(
    27017
  ) as unknown as string

  return mongoStarted
}

async function initializePostgres() {
  const POSTGRES_USER = 'admin'
  const POSTGRES_PASSWORD = 'admin-123'
  const POSTGRES_DB = 'admin'

  const postgresContainer = new GenericContainer('postgres:14.2')
    .withExposedPorts(5432)
    .withEnv('POSTGRES_USER', POSTGRES_USER)
    .withEnv('POSTGRES_PASSWORD', POSTGRES_PASSWORD)
    .withEnv('POSTGRES_DB', POSTGRES_DB)

  if (type() === 'Linux') {
    console.log('postgres: using tmpfs mount')
    postgresContainer.withTmpFs({ '/var/lib/postgresql/data': '' })
  }

  const postgresStarted = await startContainer(postgresContainer, 'postgress')

  process.env.POSTGRES_PORT = postgresStarted.getMappedPort(
    5432
  ) as unknown as string
  process.env.POSTGRES_USER = POSTGRES_USER
  process.env.POSTGRES_PASSWORD = POSTGRES_PASSWORD
  process.env.POSTGRES_DB = POSTGRES_DB

  return postgresStarted
}

async function startContainer(
  containerBuilder: GenericContainer,
  name: string
) {
  const end = timeSpan()
  const startedContainer = await containerBuilder.start()

  console.log(`${name} started in: ${end.seconds()} seconds`)

  return startedContainer
}
