class RemoveProperty {

    constructor(allowedProperties = []) {
        this.allowedProperties = allowedProperties;
    }

    transform(input) {
        const result = Object.assign({}, input);

        Object.keys(result).forEach(k => {
            if (!this.allowedProperties.includes(k)) {
                delete result[k];
            }
        });

        return result;
    }
};

module.exports = RemoveProperty;