const build = require('./Builder');
const RemoveProperty = require('../transform/RemoveProperty');
const SchemaHelper = require('./SchemaHelper');

class SchemaGenerator {

    constructor(schema) {
        this.schemaHelper = new SchemaHelper(schema);
    }

    generate() {

        let questionnaire = build(this.schemaHelper.getProperties('meta'), this.schemaHelper);

        let group = build(this.schemaHelper.getProperties('group'), this.schemaHelper);
        group = new RemoveProperty(this.schemaHelper.getRequired('group')).transform(group);

        questionnaire.groups.push(group);

        return questionnaire;
    }
}

module.exports = SchemaGenerator;