const ApolloClient = require('apollo-client').ApolloClient;
const createNetworkInterface = require('apollo-client').createNetworkInterface;

const GraphQLApi = require('./GraphQLApi');
const MockGraphQLApi = require('./MockGraphQLApi');

const includes = require('lodash').includes;

module.exports = () => {

    let result = MockGraphQLApi;

    if (includes(process.argv, 'withGraphQL')) {
        const client = new ApolloClient({
            networkInterface: createNetworkInterface({
                uri: process.env.GRAPHQL_API_URL,
            }),
        });

        result = new GraphQLApi(client)
    }

    return result;

};