const GraphQLApi = require("./GraphQLApi");

describe("GraphQL Api", () => {
  it("should accept a client", () => {
    const mockClient = jest.fn();
    expect(new GraphQLApi(mockClient).client).toBe(mockClient);
  });

  describe("interaction with client", () => {
    let mockClient;
    let api;

    beforeEach(() => {
      mockClient = {
        query: jest.fn()
      };

      api = new GraphQLApi(mockClient);
    });

    it("should call query on the client", () => {
      api.getAuthorData(1);

      expect(mockClient.query).toHaveBeenCalled();
    });

    it("should pass questionnaire Id into query", () => {
      api.getAuthorData(13);

      expect(mockClient.query).toBeCalledWith(
        expect.objectContaining({
          variables: { questionnaireId: 13 }
        })
      );
    });
  });
});
