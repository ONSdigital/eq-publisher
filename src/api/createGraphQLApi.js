const { MockNetworkInterface } = require("eq-author-mock-api");
const schema = require("eq-author-graphql-schema");
const {
  ApolloClient,
  createNetworkInterface,
  IntrospectionFragmentMatcher
} = require("apollo-client");

const GraphQLApi = require("./GraphQLApi");

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Answer",
          possibleTypes: [
            { name: "BasicAnswer" },
            { name: "MultipleChoiceAnswer" }
          ]
        }
      ]
    }
  }
});

exports.createNetworkInterface = (fn, mocks = {}) => {
  return process.env.GRAPHQL_API_URL
    ? fn({ uri: process.env.GRAPHQL_API_URL })
    : new MockNetworkInterface(schema, mocks);
};

exports.createApolloClient = networkInterface => {
  return new ApolloClient({
    networkInterface,
    fragmentMatcher
  });
};

exports.createGraphQLApi = client => {
  return new GraphQLApi(client);
};

exports.getGraphQLApi = () => {
  return exports.createGraphQLApi(
    exports.createApolloClient(
      exports.createNetworkInterface(createNetworkInterface)
    )
  );
};
