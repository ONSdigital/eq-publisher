const schema = require("eq-author-graphql-schema/schema");
const mockServer = require("graphql-tools").mockServer;
const getQuestionnaire = require("./queries").getQuestionnaire;

const mockApi = mockServer(schema);

class MockGraphQLApi {
  getAuthorData(questionnaireId) {
    return mockApi.query(getQuestionnaire, {
      questionnaireId: questionnaireId
    });
  }
}

module.exports = new MockGraphQLApi();
