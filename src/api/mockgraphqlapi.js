
class MockGraphQLApi {

    getQuestionnaire(questionnaireId) {
        return `{
            questionnaire: {
                id: ${questionnaireId}
            }
        }`
    }


}

module.exports = MockGraphQLApi;