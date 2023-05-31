import serverlessConfig from './index.js'

serverlessConfig.addFormat({ name: 'youhou', validate: function (val) { if (val && !val.startsWith('y')) { throw new Error('Must start with "y"') } } })

const config = serverlessConfig({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  youhouStyle: {
    format: 'youhou',
    default: null
  }
})

config.validate()

console.log(config.isFreeze())

config.set('youhouStyle', 'yolo')

config.set('test', 'toto')
console.log(config.get('test'))

config.set('test', 'tata')
console.log(config.get('test'))

config.freeze()

config.set('test', 'titi')

console.log(config.isFreeze())
console.log(config.get('test'))

console.log(config.toObject())

config.validate()
