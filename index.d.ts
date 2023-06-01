import { Config } from 'convict'

export interface ConvictServerlessConfig<T> extends Config<T> {
  isFrozen: () => boolean
  freeze: () => void
  toObject: () => Record<string, any>
}
