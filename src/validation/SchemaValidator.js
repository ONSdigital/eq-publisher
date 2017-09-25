const Validator = require("jsonschema").Validator;

class SchemaValidator {
  constructor(mainSchema, childSchemas = []) {
    this.mainSchema = mainSchema;
    this.validator = new Validator();
    childSchemas.forEach(s => {
      this.validator.addSchema(s.schema, s.uri);
    });
  }

  validate(json) {
    return this.validator.validate(json, this.mainSchema);
  }
}

module.exports = SchemaValidator;
