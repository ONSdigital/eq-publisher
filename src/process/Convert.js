const Questionnaire = require("../eq_schema/Questionnaire");
const ValidationError = require("../validation/ValidationError");

class Convert {
  constructor(schemaValidator) {
    if (!schemaValidator) {
      throw Error("no schema validator provided");
    }
    this.schemaValidator = schemaValidator;
  }

  async convert(authorJson) {
    const output = new Questionnaire(authorJson);

    const result = await this.schemaValidator.validate(output);
    if (!result.valid) {
      throw new ValidationError(
        "Converted author schema is not valid EQ schema.",
        result.errors
      );
    }

    return output;
  }
}

module.exports = Convert;
