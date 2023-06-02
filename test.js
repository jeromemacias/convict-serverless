import test from 'ava';
import serverlessConfig from './index.js';

serverlessConfig.addFormat({name: 'youhou', validate(value) {
	if (value && !value.startsWith('y')) {
		throw new Error('Must start with "y"');
	}
}});

const config = serverlessConfig({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV',
	},
	youhouStyle: {
		format: 'youhou',
		default: null,
	},
});

test('main', t => {
	let validateOutput;
	function validateToOutput(output) {
		validateOutput = output;
	}

	config.validate({output: validateToOutput});
	t.is(validateOutput, undefined, 'Validate ok');

	t.false(config.isFrozen(), 'is not frozen');

	config.set('youhouStyle', 'yolo');

	config.set('test', 'toto');
	t.is(config.get('test'), 'toto', 'Test value is toto');

	config.set('test', 'tata');
	t.is(config.get('test'), 'tata', 'Test value is tata');

	config.set('youhouStyle', 'not starting with y');
	t.throws(
		() => config.validate({output: validateToOutput}),
		{
			message: 'youhouStyle: Must start with "y": value was "not starting with y"',
		},
	);
	config.set('youhouStyle', 'yolo');

	config.freeze();
	config.set('test', 'titi');

	t.true(config.isFrozen(), 'is frozen');
	t.is(config.get('test'), 'tata', 'Test value is tata');

	t.deepEqual(
		config.toObject(),
		{env: 'test', youhouStyle: 'yolo', test: 'tata'},
		'To object',
	);

	config.validate({output: validateToOutput});
	t.is(
		validateOutput,
		'Warning: configuration param \'test\' not declared in the schema', 'Validate have woarning',
	);
});
