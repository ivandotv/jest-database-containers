console.log('setup once')

import { GenericContainer } from 'testcontainers'

module.exports = async (config) => {
  console.log('global setup START')

  // console.log({ config })
  console.log('watch ', config.watch)
  console.log('watch all ', config.watchAll)
  // const container = await new GenericContainer('mongo')
  //   .withTmpFs({ '/data/db': '' })
  //   .withExposedPorts({
  //     container: 27017,
  //     host: 3001
  //   })
  //   .start()

  // console.log({ container })
  console.log('global setup END')
}
