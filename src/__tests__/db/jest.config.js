const parenConfig = require('../../../jest.config')

const currentPath = 'src/__tests__/db'

module.exports = {
  ...parenConfig,
  projects: undefined,
  displayName: 'database',
  rootDir: '../../../',
  testMatch: [`<rootDir>${currentPath}/**/?(*.)+(spec|test).[jt]s?(x)`],
  testEnvironment: 'node',
  // setupFilesAfterEnv: [`<rootDir>${currentPath}/jestSetup.ts`],
  globalSetup: `<rootDir>${currentPath}/jestGlobalSetup.ts`,
  globalTeardown: `<rootDir>${currentPath}/jestGlobalTeardown.ts`
}
