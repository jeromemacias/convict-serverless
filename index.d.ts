import type convict from 'convict';

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type ConvictServerlessConfig<T> = {
	isFrozen: () => boolean;
	freeze: () => void;
	toObject: () => T;
} & convict.Config<T>;
/* eslint-enable @typescript-eslint/no-redundant-type-constituents */

export default function convictServerless<T>(def: convict.Schema<T>, options?: convict.Options): ConvictServerlessConfig<T>;
