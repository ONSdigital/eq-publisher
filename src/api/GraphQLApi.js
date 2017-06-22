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
                questionnaire(id: $questionnaireId) {
                    id
                    title
                    description
                    theme
                    legalBasis
                    navigation
                    pages {
                      id
                      title
                      description
                      questions {
                        id
                        title
                        description
                        guidance
                        type
                        mandatory
                        createdAt
                        updatedAt
                        answers {
                          id
                          description
                          guidance
                          qCode
                          label
                          type
                          mandatory
                          createdAt
                          updatedAt
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


