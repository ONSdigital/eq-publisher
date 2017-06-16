const eqSchema = require('../../data/schema_v1.json');
const SchemaHelper = require('../schema/SchemaHelper');
const ConvertQuestionnaire = require('../steps/ConvertQuestionnaire');
const Convert = require('./Convert');

describe('graphql to eq converter', () => {

    let schemaHelper;

    beforeAll(() => {
        schemaHelper = new SchemaHelper(eqSchema);
    });

    describe('conversion steps', () => {
        it('should default to no steps', () => {
           const convert = new Convert(schemaHelper);
           expect(convert.steps).toHaveLength(0);
        });

        it('should not modify the input JSON if no steps performed', () => {
            const convert = new Convert(schemaHelper);
            const input = {
                this_should: 'not be modified'
            };

            expect(convert.convert(input)).toEqual(input);

        });

        it('should accept steps', () => {
           const steps = [{ step: 1 }, { step: 2 }];
           const convert = new Convert(schemaHelper, steps);
           expect(convert.steps).toHaveLength(2);
           expect(convert.steps).toBe(steps);
        });

    });

    describe('performing the conversions', () => {

        it('should convert top level questionnaire json', () => {
            const steps = [ConvertQuestionnaire];
            const convert = new Convert(schemaHelper, steps);

            const input = {
                "id": "1",
                "title": "Quarterly Business Survey",
                "description": "Quarterly Business Survey",
                "theme": "default",
                "legalBasis": "StatisticsOfTradeAct",
                "navigation": false,
                "pages": [{
                    id: "page_id"
                }]
            };

            const expected = {
                "data_version": "0.0.1",
                "description": "Quarterly Business Survey",
                "groups": [{
                    id: "page_id"
                }],
                "legal_basis": "StatisticsOfTradeAct",
                "mime_type": "",
                "schema_version": "",
                "survey_id": "1",
                "theme": "default",
                "title": "Quarterly Business Survey",
                "navigation": false
            };

            expect(convert.convert(input)).toEqual(expected);
        });


        it('should convert pages into groups.blocks', () => {



        });

    });


});