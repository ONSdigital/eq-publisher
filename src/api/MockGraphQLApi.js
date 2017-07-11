
class MockGraphQLApi {

    // TODO This will eventually be removed. For now it's useful for development purposes.

  getAuthorData(questionnaireId) {
    return Promise.resolve({
      "data": {
        "questionnaire": {
          "id": questionnaireId,
          "title": "Quarterly Business Survey",
          "description": "This is the survey description",
          "theme": "default",
          "legalBasis": "Voluntary",
          "navigation": true,
          "groups": [
            {
              "id": 1,
              "title": "Group 1",
              "description": "This is group 1",
              "pages": [
                {
                  "id": 4,
                  "title": "Question 1",
                  "description": "This is quesstion 1",
                  "guidance": "",
                  "pageType": "Question",
                  "type": "General",
                  "mandatory": false,
                  "answers": [
                    {
                      "id": 2,
                      "description": "This is answer 2",
                      "guidance": "",
                      "qCode": "Answer-2-Qcode",
                      "label": "Answer 2",
                      "type": "PositiveInteger",
                      "mandatory": false
                    },
                    {
                      "id": 1,
                      "description": "This is answer 1",
                      "guidance": "",
                      "qCode": "Answer-1-Qcode",
                      "label": "Answer 1",
                      "type": "PositiveInteger",
                      "mandatory": false
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    })
  }

}

module.exports = new MockGraphQLApi();