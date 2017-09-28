const { getQuestionnaire } = require("./queries");
const fetch = require("node-fetch");

global.fetch = fetch;

class GraphQLApi {
  constructor(apolloClient) {
    this.apolloClient = apolloClient;
  }

  getAuthorData(questionnaireId) {
    return this.apolloClient.query({
      query: getQuestionnaire,
      variables: { questionnaireId: questionnaireId.toString(10) },
      fetchPolicy: "network-only"
    });
  }
}

module.exports = GraphQLApi;
