const { getQuestionnaire } = require("./queries");
const { parseInt } = require("lodash");

class GraphQLApi {
  constructor(apolloFetch) {
    this.apolloFetch = apolloFetch;
  }

  getAuthorData(questionnaireId) {
    return this.apolloFetch({
      query: getQuestionnaire,
      variables: { questionnaireId: parseInt(questionnaireId) }
    });
  }
}

module.exports = GraphQLApi;
