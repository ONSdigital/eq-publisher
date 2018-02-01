const request = require("request-promise");
const ValidationError = require("./ValidationError");
const { isEmpty } = require("lodash");

const EQ_SCHEMA_VALIDATOR_URL = "http://localhost:32770/validate";

class SchemaValidator {
  async validate(json) {
    if (!json || json === undefined) {
      throw new ValidationError("Invalid JSON schema");
    }

    const result = {
      valid: true
    };

    try {
      const res = await request.post(EQ_SCHEMA_VALIDATOR_URL, {
        body: json,
        json: true
      });

      if (!isEmpty(res)) {
        result.valid = false;
        result.errors = res.errors;
      }

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SchemaValidator;
