const convertMeta = require('./convertMeta')

class EQConverter {
    convert(authorJson) {

        // TODO Transform authorJson to EQ schema valid JSON

        return Object.assign({}, authorJson);
    }
}

module.exports = new EQConverter();