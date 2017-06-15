class SchemaParser {

    constructor(schema) {
        this.meta = schema;
        this.groups = this.meta.properties.groups;
        this.blocks = this.groups.items.properties.blocks;
        this.sections = this.blocks.items.properties.sections;
        this.questions = this.sections.items.properties.questions;
        this.answers = this.questions.items.properties.answers;

        this.getRequired.bind(this);
        this.getProperties.bind(this);
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
        } else if (elem == 'meta') {
            return this.meta.properties;
        } else {
            return this[elem].items.properties;
        }
    }


}

module.exports = SchemaParser;