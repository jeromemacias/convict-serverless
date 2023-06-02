import type convict from 'convict';

export type ConvictServerlessConfig<T> = {
	isFrozen: () => boolean;
	freeze: () => void;
	toObject: () => T;
} & Omit<convict.Config<T>, 'loadFile'>;

export default function convictServerless<T>(def: convict.Schema<T>, options?: convict.Options): ConvictServerlessConfig<T>;
