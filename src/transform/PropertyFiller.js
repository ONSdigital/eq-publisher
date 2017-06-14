class PropertyFiller {

    constructor(required=[], properties={}) {
        this.required = required;
        this.properties = properties;

        this.transform.bind(this);
        this.createEmptyValue.bind(this);
    }

    transform(input) {
        const result = Object.assign({}, input);

        this.required.forEach(key => {
            if (!result.hasOwnProperty(key)) {
                result[key] = this.createEmptyValue(key);
            }
        });

        return result;
    }

    createEmptyValue(key) {
        let result = null;

        for (let k  of Object.keys(this.properties)) {
            if (key === k && this.properties[k].hasOwnProperty('type')) {
                switch (this.properties[k].type) {
                    case 'string':
                        result = "";
                        break;
                    case 'integer':
                        result = 0;
                        break;
                    case 'boolean':
                        result = new Boolean();
                        break;
                    case 'array':
                        result =  [];
                        break;
                    case 'object':
                        result =  {};
                        break;
                }

                if (result === null
                    && this.properties[k].type.hasOwnProperty('enum')
                    && this.properties[k].type.enum.length > 0) {
                    result = this.properties[k].type.enum[0];
                }

            }

            if (result !== null) {
                break;
            }

        }

        return result;
    }

}

module.exports = PropertyFiller;