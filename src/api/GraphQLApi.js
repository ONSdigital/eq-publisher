const gql = require('graphql-tag');
const fetch = require('node-fetch');

global.fetch = fetch;


class GraphQLApi {

  constructor(client) {
    this.client = client;
  }

  getAuthorData(questionnaireId) {
    return this.client.query({
      query: gql`
            query GetQuestionnaire($questionnaireId : Int!){
              questionnaire(id: $questionnaireId) {
                id
                title
                description
                theme
                legalBasis
                navigation
                groups {
                  id
                  title
                  description
                  pages {
                    ... on QuestionPage {
                      id
                      title
                      description
                      guidance
                      pageType
                      type
                      mandatory
                      answers{
                        id
                        description
                        guidance
                        qCode
                        label
                        type
                        mandatory
                      }
                    }
                  }
                }
              }
            }`,
      variables: { questionnaireId: questionnaireId },
      fetchPolicy: 'network-only'
    });
  }

}

module.exports = GraphQLApi;


