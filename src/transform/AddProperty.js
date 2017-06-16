const createEmptyValue = require('./CreateEmptyValue');

class AddProperty {

    constructor(required=[], properties={}) {
        this.required = required;
        this.schemaHelper = properties;
    }

    transform(input) {
        const result = Object.assign({}, input);

        this.required.forEach(key => {
            if (!result.hasOwnProperty(key)) {
                result[key] = this.createEmptyValues(key);
            }
        });

        return result;
    }

    createEmptyValues(key) {
        let result = null;

        for (let k  of Object.keys(this.schemaHelper)) {
            if (key == k) {
                result = createEmptyValue(this.schemaHelper[k]);
            }

            if (result !== null) {
                break;
            }

        }

        return result;
    }

}

module.exports = AddProperty;