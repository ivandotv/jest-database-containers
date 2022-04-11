console.log('teardown once')
let firstRun = true
module.exports = (config) => {
  console.log('teardown')
  console.log({ firstRun })
  firstRun = false
}
