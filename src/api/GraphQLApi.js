const getQuestionnaire = require("./queries").getQuestionnaire;
const fetch = require("node-fetch");
const gql = require("graphql-tag");

global.fetch = fetch;

class GraphQLApi {
  constructor(client) {
    this.client = client;
  }

  getAuthorData(questionnaireId) {
    return this.client.query({
      query: gql(getQuestionnaire),
      variables: { questionnaireId: questionnaireId },
      fetchPolicy: "network-only"
    });
  }
}

module.exports = GraphQLApi;
