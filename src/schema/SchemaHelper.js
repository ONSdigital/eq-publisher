class SchemaHelper {

    constructor(schema) {
        this.meta = schema;
        this.definitions = schema.definitions;
        this.groups = this.meta.properties.groups;
        this.group = this.groups.items;
        this.blocks = this.groups.items.properties.blocks;
        this.block = this.blocks.items;
        this.sections = this.blocks.items.properties.sections;
        this.section = this.sections.items;
        this.questions = this.sections.items.properties.questions;
        this.question = this.questions.items;
        this.answers = this.questions.items.properties.answers;
        this.answer = this.answers.items;
    }

    getRequired(elem) {
        if (!Object.keys(this).includes(elem)) {
            throw Error(elem + " is not a key of eq json schema");
        } else if (elem === 'meta') {
            return this.meta.required;
        } else {
            return this[elem].items.required;
        }
    }

    getProperties(elem) {
        if (!Object.keys(this).includes(elem)) {
            throw Error(elem + " is not a key of eq json schema");
        } else if (elem === 'meta' || elem === 'group' || elem === 'block' || elem === 'section' || elem === 'question' || elem === 'answer') {
            return this[elem].properties;
        } else {
            return this[elem].items.properties;
        }
    }


}

module.exports = SchemaHelper;