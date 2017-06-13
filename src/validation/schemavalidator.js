var validateJson = require('jsonschema').validate;

class SchemaValidator {

    constructor(jsonSchema) {
        this.jsonSchema = jsonSchema;
        this.validate.bind(this);
    }

    validate(json) {
        const validation = validateJson(json, this.jsonSchema);
        return validation;
    }

}

module.exports = SchemaValidator;