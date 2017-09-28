const {
  createGraphQLApi,
  createNetworkInterface,
  createApolloClient,
  getGraphQLApi
} = require("./createGraphQLApi");
const { MockNetworkInterface } = require("eq-author-mock-api");
const { ApolloClient } = require("apollo-client");

describe("createGraphQLApi", () => {
  describe("createNetworkInterface", () => {
    it("should create a mock network interface when no endpoint set", () => {
      const result = createNetworkInterface();
      expect(result).toBeInstanceOf(MockNetworkInterface);
    });

    it("should not call createNetworkInterface when URI not set", () => {
      const mockCreateNetworkInterface = jest.fn();

      createNetworkInterface(mockCreateNetworkInterface);
      expect(mockCreateNetworkInterface).not.toHaveBeenCalled();
    });

    it("should create a real network interface when supplied with a URL", () => {
      const endpoint = "http://localhost:4000/mockGraphQLApi";
      process.env.GRAPHQL_API_URL = endpoint;

      const mockCreateNetworkInterface = jest.fn();

      createNetworkInterface(mockCreateNetworkInterface);

      expect(mockCreateNetworkInterface).toHaveBeenCalledWith({
        uri: endpoint
      });

      delete process.env.GRAPHQL_API_URL;
    });
  });

  describe("createApolloClient", () => {
    it("should return a valid client", () => {
      const mockNetworkInterface = jest.fn();
      const result = createApolloClient(mockNetworkInterface);
      expect(result).toBeInstanceOf(ApolloClient);
    });
  });

  it("should allow passing in mocks to the mock Api", () => {
    const mocks = {
      ID: () => "999",
      String: () => "Mocked value"
    };

    const networkInterface = createNetworkInterface(jest.fn(), mocks);
    const api = createGraphQLApi(createApolloClient(networkInterface));

    return api.getAuthorData(1).then(result => {
      const questionnaire = result.data.questionnaire;
      expect(questionnaire.id).toBe("999");
      expect(questionnaire.title).toBe("Mocked value");
    });
  });

  describe("getGraphQLApi", () => {
    it("should configure the API with sensible defaults", () => {
      const result = getGraphQLApi();

      expect(result.apolloClient).toBeTruthy();
      expect(result.apolloClient.networkInterface).toBeTruthy();
    });
  });
});
