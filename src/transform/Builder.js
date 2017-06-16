const createEmptyValue = require('./CreateEmptyValue');

class Builder {

    constructor(properties, schemaHelper) {
        this.properties = properties;
        this.schemaHelper = schemaHelper;
    }

    build(input = {}) {
        let result = Object.assign({}, input);

        // Go through all the properties

        Object.keys(this.properties).forEach(prop => {

            const newProperty = {};

            if (prop.hasOwnProperty('type')) {
                newProperty[prop] = createEmptyValue(prop.type);
            } else if (prop.hasOwnProperty('enum') && prop.enum.length > 0) {
                newProperty[prop] = prop.enum[0];
            }

           result = Object.assign(result, newProperty);
        });

        return result;
    }
}

module.exports = Builder;