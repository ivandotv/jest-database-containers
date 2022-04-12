const parenConfig = require('../../../../jest.config')

module.exports = {
  ...parenConfig,
  name: 'db',
  displayName: 'Database',
  rootDir: '../',
  testMatch: ['<rootDir>/**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest-setup/jestSetup.ts'],
  globalSetup: '<rootDir>/jest-setup/jestGlobalSetup.ts',
  globalTeardown: '<rootDir>/jest-setup/jestGlobalTeardown.ts'
}
