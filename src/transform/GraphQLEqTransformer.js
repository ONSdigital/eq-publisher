class GraphQLEqTransformer {

    constructor(parser) {
        this.parser = parser;

        this.transform.bind(this);
    }

    transform(authorJson) {
        // TODO Transform authorJson to EQ schema valid JSON
        return Object.assign({}, authorJson);
    }
}

module.exports = new GraphQLEqTransformer;