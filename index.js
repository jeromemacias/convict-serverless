import convict from 'convict';

function convictServerless(def, options) {
	let isFrozen = false;

	if (typeof def === 'string') {
		throw new TypeError('Schema definition must be an object');
	}

	const baseConvict = convict(def, options);

	delete baseConvict.loadFile;

	const baseConvictSet = baseConvict.set.bind(baseConvict);

	baseConvict.set = function (k, v) {
		if (isFrozen) {
			return;
		}

		return baseConvictSet(k, v);
	};

	baseConvict.freeze = function () {
		isFrozen = true;
	};

	baseConvict.isFrozen = function () {
		return isFrozen;
	};

	baseConvict.toObject = function () {
		return JSON.parse(baseConvict.toString());
	};

	return baseConvict;
}

convictServerless.addFormat = convict.addFormat;
convictServerless.addFormats = convict.addFormats;

export default convictServerless;
