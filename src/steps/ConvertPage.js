const AddProperty = require('../transform/AddProperty');
const Builder = require('../transform/Builder');

const merge = require('lodash').merge;

class ConvertPage {

    constructor(schemaHelper) {
        this.schemaHelper = schemaHelper;
    }

    convert(input) {
        const block = new Builder(this.schemaHelper.getProperties('block')).build();

        const result = merge({}, block, input);

        return result;
    }
}

module.exports = ConvertPage;