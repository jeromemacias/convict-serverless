import {expectType} from 'tsd'

import convictServerless, { ConvictServerlessConfig } from './index.js'

type TestConfig = {
  env: string
  timeout: number
}

const schema = {
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  timeout: {
    doc: 'The application timeout.',
    format: Number,
    default: 30
  }
}

expectType<ConvictServerlessConfig<TestConfig>>(convictServerless<TestConfig>(schema));
