const schema = require("eq-author-graphql-schema/schema");
const { mockServer } = require("graphql-tools");
const { getQuestionnaire } = require("./queries");

const mockApi = mockServer(schema);

class MockGraphQLApi {
  getAuthorData(questionnaireId) {
    return mockApi.query(getQuestionnaire, {
      questionnaireId: questionnaireId
    });
  }
}

module.exports = new MockGraphQLApi();
