const Questionnaire = require('../eq_schema/Questionnaire');

class Convert {

    constructor(schemaValidator) {
        if (!schemaValidator) {
            throw Error('no schema validator provided');
        }
        this.schemaValidator = schemaValidator;
    }

    convert(authorJson) {
        const output = Object.assign({}, new Questionnaire(authorJson.questionnaire));

        let validation = this.schemaValidator.validate(output);
        if (!validation.valid) {
            throw Error('Converted author schema is not valid EQ schema.');
        }

        return output;
    }
}

module.exports = Convert;