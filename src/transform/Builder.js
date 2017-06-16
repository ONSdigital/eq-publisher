const createEmptyValue = require('./CreateEmptyValue');

class Builder {

    constructor(properties) {
        this.properties = properties;

        this.build.bind(this);
    }

    build(input = {}) {
        let result = Object.assign({}, input);

        Object.keys(this.properties).forEach(prop => {
            const newProperty = {};
            newProperty[prop] = createEmptyValue(this.properties[prop]);
           result = Object.assign(result, newProperty);
        });

        return result;
    }
}

module.exports = Builder;