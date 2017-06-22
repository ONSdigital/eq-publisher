
class MockGraphQLApi {

    // TODO This will eventually be removed. For now it's useful for development purposes.

    getAuthorData(questionnaireId) {
        return Promise.resolve({
            "data": {
                "questionnaire": {
                    "id": questionnaireId,
                    "title": "Quarterly Business Survey",
                    "description": "Quarterly Business Survey",
                    "theme": "default",
                    "legalBasis": "StatisticsOfTradeAct",
                    "navigation": false,
                    "sections": [{
                        "id": "section-1",
                        "title": "Section One",
                        "description": "Description of section one.",
                        "pages": [
                            {
                                "id": 1,
                                "title": "Introduction",
                                "description": "Introduction",
                                "questions": [],
                                "type": "Introduction"
                            },
                            {
                                "id": 5,
                                "title": "Number of employees",
                                "description": "Number of employees",
                                "type": "Questionnaire",
                                "questions": [
                                    {
                                        "id": 2,
                                        "title": "On {{exercise.start_date|format_date}} what was the number of employees for {{respondent.trad_as_or_ru_name}}?",
                                        "description": "An employee is anyone aged 16 years or over that your organisation directly pays from its payroll(s), in return for carrying out a full-time or part-time job or being on a training scheme.",
                                        "guidance": "{\r                                \"list\": [\r                                    \"all workers paid directly from this business’s payroll(s)\",\r                                    \"those temporarily absent but still being paid, for example on maternity leave",
                                        "type": "General",
                                        "mandatory": false,
                                        "answers": [
                                            {
                                                "id": 1,
                                                "description": null,
                                                "guidance": null,
                                                "qCode": "51",
                                                "label": "Number of male employees working more than 30 hours per week",
                                                "type": "PositiveInteger",
                                                "mandatory": false
                                            },
                                            {
                                                "id": 3,
                                                "description": null,
                                                "guidance": null,
                                                "qCode": "52",
                                                "label": "Number of male employees working 30 hours or less per week",
                                                "type": "PositiveInteger",
                                                "mandatory": false
                                            },
                                            {
                                                "id": 4,
                                                "description": null,
                                                "guidance": null,
                                                "qCode": "53",
                                                "label": "Number of female employees working more than 30 hours per week",
                                                "type": "PositiveInteger",
                                                "mandatory": false
                                            },
                                            {
                                                "id": 5,
                                                "description": null,
                                                "guidance": null,
                                                "qCode": "54",
                                                "label": "Number of female employees working 30 hours or less per week",
                                                "type": "PositiveInteger",
                                                "mandatory": false
                                            },
                                            {
                                                "id": 6,
                                                "description": null,
                                                "guidance": null,
                                                "qCode": "50",
                                                "label": "Total number of employees",
                                                "type": "PositiveInteger",
                                                "mandatory": false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "title": "Summary",
                                "description": "Summary",
                                "questions": [],
                                "type": "Summary"
                            }
                        ]
                    }]
                }
            }
        })
    }

}

module.exports = new MockGraphQLApi();