const ApolloClient = require('apollo-client').ApolloClient;
const createNetworkInterface = require('apollo-client').createNetworkInterface;

const GraphQLApi = require('./GraphQLApi');
const MockGraphQLApi = require('./MockGraphQLApi');

module.exports = () => {

  let result = MockGraphQLApi;

  if (process.env.GRAPHQL_API_URL) {
    const client = new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: process.env.GRAPHQL_API_URL,
      }),
    });

    result = new GraphQLApi(client)
  }

  return result;

};