const createEmptyValue = require('./CreateEmptyValue');

class BuildProperty {

    constructor(properties) {
        this.properties = properties;

        this.transform.bind(this);
    }

    transform(input) {
        let result = Object.assign({}, input);

        Object.keys(this.properties).forEach(prop => {
            const newProperty = {};
            newProperty[prop] = createEmptyValue(this.properties[prop]);
           result = Object.assign(result, newProperty);
        });

        return result;
    }
}

module.exports = BuildProperty;