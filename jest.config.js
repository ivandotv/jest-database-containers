module.exports = {
  projects: ['<rootDir>/src/__tests__/*'],
  // testMatch: [
  //   '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  //   '<rootDir>/tests/**/?(*.)+(spec|test).[jt]s?(x)'
  // ],
  testEnvironment: 'node',
  // moduleDirectories: ['node_modules', 'src'],
  // setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  // globalSetup: '<rootDir>/jestGlobalSetup.ts',
  // globalTeardown: '<rootDir>/jestGlobalTeardown.ts',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    __DEV__: false, //toggle to true to execute the code in __DEV__ scope
    __VERSION__: 'jest-version',
    __BUILD_DATE__: 'jest-build-date',
    __COMMIT_SHA__: 'jest-commit-sha'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '<rootDir>/src/index.ts',
    '!<rootDir>/src/types.ts',
    '!<rootDir>/src/**.d.ts',
    '!<rootDir>/src/__tests__/**',
    '!<rootDir>/src/__fixtures__/**'
  ],
  // https://github.com/facebook/jest/issues/9628
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/index.ts': {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
}
