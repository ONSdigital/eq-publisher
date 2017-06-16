const eqSchema = require('../../data/schema_v1.json');
const SchemaHelper = require('../schema/SchemaHelper');

const ConvertPage = require('./ConvertPage');

describe('ConvertPage', () => {

    let schemaHelper;

    beforeAll(() => {
        schemaHelper = new SchemaHelper(eqSchema);
    });

    describe('convert a page into a block', () => {

        it('should be able to convert a page with no questions', () => {
            const convert = new ConvertPage(schemaHelper);
            const input = {
                "id": 1,
                "title": "Introduction",
                "description": "Introduction",
                "questions": []
            };

            const expected = {
                "basis_for_completion": [],
                "description": "Introduction",
                "id": 1,
                "information_to_provide": [],
                "questions": [],
                "routing_rules": null,
                "sections": [],
                "skip_condition": null,
                "title": "Introduction",
                "type": "Questionnaire"
            };

            expect(convert.convert(input)).toEqual(expected);
        });
    });

});