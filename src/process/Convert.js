const Questionnaire = require('../eq_schema/Questionnaire');
const ValidationError = require('../validation/ValidationError');

class Convert {

    constructor(schemaValidator) {
        if (!schemaValidator) {
            throw Error('no schema validator provided');
        }
        this.schemaValidator = schemaValidator;
    }

    convert(authorJson) {
        const output = new Questionnaire(authorJson.questionnaire);

        let validation = this.schemaValidator.validate(output);
        if (!validation.valid) {
            throw ValidationError('Converted author schema is not valid EQ schema.', validation);
        }

        return output;
    }
}

module.exports = Convert;