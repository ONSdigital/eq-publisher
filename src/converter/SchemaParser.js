class SchemaParser {

    constructor(schema) {
        const meta = schema;
        const groups = meta.properties.groups;
        const blocks = groups.items.properties.blocks;
        const sections = blocks.items.properties.sections;
        const questions = sections.properties.questions;
        const answers = questions.properties.answers;

        this.meta = meta;
        this.groups = groups;
        this.blocks = blocks;
        this.sections = sections;
        this.questions = questions;
        this.answers = answers;
    }


}

module.exports = SchemaParser;