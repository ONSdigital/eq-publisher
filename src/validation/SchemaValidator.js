var validateJson = require('jsonschema').validate;

class SchemaValidator {

    constructor(jsonSchema) {
        this.jsonSchema = jsonSchema;
        this.validate.bind(this);
    }

    validate(json) {
        return validateJson(json, this.jsonSchema);
    }

}

module.exports = SchemaValidator;