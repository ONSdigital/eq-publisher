const Transformer = require('../transform/RenameProperty');
const PropertyFiller = require('../transform/AddProperty');

class GraphQLEqConverter {

    constructor(schemaParser) {
        this.schemaParser = schemaParser;

        this.convert.bind(this);
    }

    convert(authorJson) {
        // TODO Transform authorJson to EQ schema valid JSON

        let result = {};

        const meta = new PropertyFiller(this.schemaParser.getRequired('meta'),
            this.schemaParser.getProperties('meta'));

        result = meta.transform(result);

        //
        //
        //
        // // Create a new object based on the author JSON.
        // let result = Object.assign({}, authorJson);
        //
        // // Swap the meta keys
        // const metaTransforms = {
        //     'legalBasis': 'legal_basis',
        //     'pages': 'blocks'
        // };
        // const transformMeta = new RenameProperty(metaTransforms);
        // transformMeta.transform(result);
        //
        //
        // // Transform the keys

        return result;
    }
}

module.exports = GraphQLEqConverter;