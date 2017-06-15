const eqSchema = require('../../data/schema_v1.json');
const SchemaHelper = require('../schema/SchemaHelper');
const Convert = require('./Convert');

describe('graphql to eq converter', () => {

    let schemaParser;

    beforeAll(() => {
        schemaParser = new SchemaHelper(eqSchema);
    });

    it('should convert meta', () => {
        // const converter = new Convert(schemaHelper);
        //
        // const input = {
        //     "id": questionnaireId,
        //     "title": "Quarterly Business Survey",
        //     "description": "Quarterly Business Survey",
        //     "theme": "default",
        //     "legalBasis": "StatisticsOfTradeAct",
        //     "navigation": false,
        //     "pages": []
        // };
        //
        // const expected = {
        //     "data_version": "0.0.1",
        //     "description": "Quarterly Business Survey",
        //     "groups": [],
        //     "legal_basis": "StatisticsOfTradeAct",
        //     "mime_type": "application/json/ons/eq",
        //     "schema_version": "0.0.1",
        //     "survey_id": "139",
        //     "theme": "default",
        //     "title": "Quarterly Business Survey"
        // };
        //
        // // expect(converter.convert(input)).toEqual(expected);
    });

});