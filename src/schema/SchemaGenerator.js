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

        let block = build(this.schemaHelper.getProperties('block'), this.schemaHelper);
        block = new RemoveProperty(this.schemaHelper.getRequired('block')).transform(block);

        let section = build(this.schemaHelper.getProperties('section'), this.schemaHelper);
        section = new RemoveProperty(this.schemaHelper.getRequired('section')).transform(section);

        let question = build(this.schemaHelper.getProperties('question'), this.schemaHelper);
        question = new RemoveProperty(this.schemaHelper.getRequired('question')).transform(question);

        let answer = build(this.schemaHelper.getProperties('answer'), this.schemaHelper);
        answer = new RemoveProperty(this.schemaHelper.getRequired('answer')).transform(answer);

        question.answers.push(answer);
        section.questions.push(question);
        block['sections'] = [section];
        group.blocks.push(block);
        questionnaire.groups.push(group);

        return questionnaire;
    }
}

module.exports = SchemaGenerator;