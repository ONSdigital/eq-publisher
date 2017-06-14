const SchemaParser = require('./SchemaParser')
const eqSchema = require('../../data/schema_v1.json');

describe('schema parser', () => {

    it('should accept a schema', () => {

        const schemaParser = new SchemaParser(eqSchema);

        expect(schemaParser.meta).toEqual(eqSchema);

    });

});