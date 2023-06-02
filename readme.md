# convict-serverless

> Convict but for serverless environment

## Install

```sh
npm install convict-serverless
```

## Usage

```js
import convictServerless from 'convict-serverless';

convictServerless({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
	}
})
```

## On top on convict

This library is a slight modification of [convict](https://github.com/mozilla/node-convict) to handle serverless environment.

### Api diff

No more `loadFile`. You must give a schema as object.

3 new methods:
* `toObject()`: return object config without value of sensitive value, same as `toString`
* `freeze()`: ability to freeze config, after that, you cannot set config values anymore
* `isFrozen()`: wether config is frozen or not
