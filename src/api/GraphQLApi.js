const ApolloClient = require('apollo-client').ApolloClient;
const createNetworkInterface = require('apollo-client').createNetworkInterface;
const gql = require('graphql-tag');
const fetch = require('node-fetch');

global.fetch = fetch;

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: process.env.GRAPHQL_API_URL,
    }),
});


class GraphQLApi {

    getAuthorData(questionnaireId) {
       return client.query({
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

module.exports = new GraphQLApi();


