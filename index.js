import convict from 'convict'

// TODO: add types
// TODO: inject logger

function convictServerless(def, opts) {
    let isFreeze = false

    if (typeof def === 'string') {
        throw Error('Schema definition must be an object')
    }

    const baseConvict = convict(def, opts)

    delete baseConvict.loadFile

    const baseConvictSet = baseConvict.set.bind(baseConvict)

    baseConvict.set = function (k, v) {
        if (isFreeze) {
            return
        }

        return baseConvictSet(k, v)
    }

    baseConvict.freeze = function () {
        isFreeze = true
    }

    baseConvict.isFreeze = function () {
        return isFreeze
    }

    baseConvict.toObject = function () {
        return JSON.parse(baseConvict.toString())
    }

    return baseConvict
}

convictServerless.addFormat = convict.addFormat
convictServerless.addFormats = convict.addFormats

export default convictServerless
