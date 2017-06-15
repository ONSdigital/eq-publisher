const ConvertMeta = require('./ConvertQuestionnaire');

const SchemaHelper = require('../schema/SchemaHelper');
const eqSchema = require('../../data/schema_v1.json');

describe('convert meta', () => {

    let schemaHelper;

    beforeAll(() => {
        schemaHelper = new SchemaHelper(eqSchema);
    });

    it('should populate missing required fields', () => {
        const input = {};
        const expected = {
            mime_type: "",
            schema_version: "",
            data_version: "0.0.1",
            survey_id: "",
            title: "",
            groups: [],
            theme: "",
            legal_basis: "Voluntary"
        };

        const convertMeta = new ConvertMeta(schemaHelper);

        expect(convertMeta.convert(input)).toEqual(expected);
    });

    it('should rename properties as required', () => {
        const input = {
            "id": "1",
            "title": "Quarterly Business Survey",
            "description": "Quarterly Business Survey",
            "theme": "default",
            "legalBasis": "StatisticsOfTradeAct",
            "navigation": false,
            "pages": []
        };
        const expected = {
            mime_type: "",
            schema_version: "",
            data_version: "0.0.1",
            survey_id: "1",
            title: "Quarterly Business Survey",
            groups: [],
            theme: "default",
            legal_basis: "StatisticsOfTradeAct",
            description: "Quarterly Business Survey",
            navigation: false
        };

        const convertMeta = new ConvertMeta(schemaHelper);

        expect(convertMeta.convert(input)).toEqual(expected);
    });

    it('should remove any properties that are not supported by the schema', () => {
        const input = {
            "does_not_belong": "should be removed in result",
            "id": "1",
            "title": "Quarterly Business Survey",
            "description": "Quarterly Business Survey",
            "theme": "default",
            "legalBasis": "StatisticsOfTradeAct",
            "navigation": false,
            "pages": []
        };
        const expected = {
            mime_type: "",
            schema_version: "",
            data_version: "0.0.1",
            survey_id: "1",
            title: "Quarterly Business Survey",
            groups: [],
            theme: "default",
            legal_basis: "StatisticsOfTradeAct",
            description: "Quarterly Business Survey",
            navigation: false
        };

        const convertMeta = new ConvertMeta(schemaHelper);

        expect(convertMeta.convert(input)).toEqual(expected);
    });


});