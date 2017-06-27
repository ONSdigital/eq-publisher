const Questionnaire = require('./Questionnaire');

describe('Questionnaire', () => {

    it('should should build valid runner meta info', () => {

        const authorJson = {
            "id": 1,
            "title": "Quarterly Business Survey",
            "description": "Quarterly Business Survey",
            "theme": "default",
            "legalBasis": "StatisticsOfTradeAct",
            "navigation": false,
            "groups": []
        };

        const questionnaire = new Questionnaire(authorJson);

        expect(questionnaire).toMatchObject({
            "mime_type": "application/json/ons/eq",
            "schema_version": "0.0.1",
            "data_version": "0.0.1",
            "survey_id": "1",
            "title": "Quarterly Business Survey",
            "groups": [],
            "theme": "default",
            "legal_basis": "StatisticsOfTradeAct"
        });

    });

});