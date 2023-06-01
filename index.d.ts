import convict from 'convict'

export interface ConvictServerlessConfig<T> extends convict.Config<T> {
  isFrozen: () => boolean
  freeze: () => void
  toObject: () => Record<string, any>
}

export default function convictServerless<T>(def: convict.Schema<T>, opts?: convict.Options): ConvictServerlessConfig<T>;
