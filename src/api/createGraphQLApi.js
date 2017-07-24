const MockNetworkInterface = require("./MockNetworkInterface");
const schema = require("eq-author-graphql-schema/schema");
const { ApolloClient } = require("apollo-client");

const GraphQLApi = require("./GraphQLApi");

exports.createNetworkInterface = (fn, mocks = {}) => {
  return process.env.GRAPHQL_API_URL
    ? fn({ uri: process.env.GRAPHQL_API_URL })
    : new MockNetworkInterface(schema, mocks);
};

exports.createApolloClient = networkInterface => {
  return new ApolloClient({ networkInterface });
};

exports.createGraphQLApi = client => {
  return new GraphQLApi(client);
};
