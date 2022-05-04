module.exports = {
  projects: ['<rootDir>/src/__tests__/db'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jestSetup.ts'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
