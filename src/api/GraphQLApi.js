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
            query GetQuestionnaire($questionnaireId : ID!){
              questionnaire(id:1) {
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
                    ... on Question {
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
            variables: { questionnaireId: questionnaireId }
        });
    }

}

module.exports = GraphQLApi;


