const Builder = require('../transform/Builder');
const SchemaHelper = require('./SchemaHelper');

class SchemaGenerator {

    constructor(schema) {
        this.schemaHelper = new SchemaHelper(schema);
    }

    generate() {

        const questionnaire = new Builder(this.schemaHelper.getProperties('meta')).build();

        return questionnaire;
    }
}

module.exports = SchemaGenerator;