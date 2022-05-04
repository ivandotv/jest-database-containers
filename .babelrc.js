//babel config for Jest tests
const jestConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: ['node_modules'],
  sourceMaps: 'inline'
}

module.exports = process.env.NODE_ENV === 'test' ? jestConfig : {}
