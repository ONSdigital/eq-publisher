const { getQuestionnaire } = require("./queries");
const fetch = require("node-fetch");
const gql = require("graphql-tag");

global.fetch = fetch;

class GraphQLApi {
  constructor(apolloClient) {
    this.apolloClient = apolloClient;
  }

  getAuthorData(questionnaireId) {
    return this.apolloClient.query({
      query: gql(getQuestionnaire),
      variables: { questionnaireId: questionnaireId },
      fetchPolicy: "network-only"
    });
  }
}

module.exports = GraphQLApi;
