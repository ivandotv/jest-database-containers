import { GenericContainer } from 'testcontainers'
import { type } from 'os'
import timeSpan from 'time-span'

global.containers = []

let firstRun = true

module.exports = async (_config: any) => {
  if (firstRun) {
    console.log('\nsetup started')
    const end = timeSpan()

    const containerBuilder = new GenericContainer(
      'mongo:5.0.7'
    ).withExposedPorts(27017)

    if (type() === 'Linux') {
      console.log('mongo: using tmpsf mount')
      containerBuilder.withTmpFs({ '/data/db': '' })
    }

    const startedContainer = await startContainer(containerBuilder, 'mongo')

    process.env.MONGO_PORT = startedContainer.getMappedPort(
      27017
    ) as unknown as string

    global.containers.push(startedContainer)

    console.log(`setup done in: ${end.seconds()} seconds`)
  }

  firstRun = false
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
