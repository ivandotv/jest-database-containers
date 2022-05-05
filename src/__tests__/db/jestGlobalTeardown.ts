import timeSpan from 'time-span'

module.exports = async (config: any) => {
  const { watch, watchAll } = config

  //do not run teardown in watch mode
  if (watch || watchAll) return
  const end = timeSpan()
  console.log('teardown started')

  //tear it down
  const stopped = []
  for (const container of global.containers) {
    stopped.push(container.stop({ timeout: 10000 }))
  }

  await Promise.all(stopped)

  console.log(`teardown done in: ${end.seconds()} seconds`)
}
export {}
