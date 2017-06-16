const eqSchema = require('../../data/schema_v1.json');
const SchemaHelper = require('../schema/SchemaHelper');

const BuildProperty = require('./Builder');

describe('build property', () => {

    let schemaHelper;
    beforeAll(() => {
        schemaHelper = new SchemaHelper(eqSchema);
    });

    it('should build a new object from the schema', () => {
        const buildProperty = new BuildProperty(schemaHelper.getProperties('section'));
        expect(buildProperty.build({})).toEqual({
            "id": null,
            "title": "",
            "number": "",
            "description": "",
            "questions": []
        });
    });

});