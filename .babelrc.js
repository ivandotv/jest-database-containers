const nodeEnv = process.env.NODE_ENV || 'production'

const replacements = {
  'process.env.NODE_ENV': nodeEnv
}

const plugins = ['dev-expression', ['transform-define', replacements]]

//default babel config
const config = { plugins }

//babel config for Jest tests
const jestConfig = {
  plugins,
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

module.exports = process.env.NODE_ENV === 'test' ? jestConfig : config
