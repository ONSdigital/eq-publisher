class GraphQLEqConverter {

    constructor(schemaParser) {
        this.schemaParser = schemaParser;

        this.convert.bind(this);
    }

    convert(authorJson) {
        // TODO Transform authorJson to EQ schema valid JSON
        return Object.assign({}, authorJson);
    }
}

module.exports = GraphQLEqConverter;