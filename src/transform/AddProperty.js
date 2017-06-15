const createEmptyValue = require('./CreateEmptyValue');

class AddProperty {

    constructor(required=[], properties={}) {
        this.required = required;
        this.properties = properties;
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

        for (let k  of Object.keys(this.properties)) {
            if (key == k) {
                result = createEmptyValue(this.properties[k]);
            }

            if (result !== null) {
                break;
            }

        }

        return result;
    }

}

module.exports = AddProperty;