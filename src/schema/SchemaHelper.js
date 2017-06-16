const includes = require('lodash').includes

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

        this._singularKeys = ['meta', 'group', 'block', 'section', 'question', 'answer'];
    }

    getRequired(elem) {
        if (!Object.keys(this).includes(elem)) {
            throw Error(elem + " is not a key of eq json schema");
        } else if (includes(this._singularKeys, elem)) {
            return this.meta.required;
        } else {
            return this[elem].items.required;
        }
    }

    getProperties(elem) {
        if (!Object.keys(this).includes(elem)) {
            throw Error(elem + " is not a key of eq json schema");
        } else if (includes(this._singularKeys, elem)) {
            return this[elem].properties;
        } else {
            return this[elem].items.properties;
        }
    }

    getDefinition(ref) {
        const definitionRegex = /^\#\/definitions\/(.+)$/;
        const match = definitionRegex.exec(ref);
        if (match === null) {
            throw Error(ref + ' is not a valid definition reference');
        } else if (!includes(Object.keys(this.definitions), match[1])) {
            throw Error(ref + ' definition not found');
        }

        return this.definitions[match[1]];
    }


}

module.exports = SchemaHelper;