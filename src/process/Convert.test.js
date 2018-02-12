const {
  createGraphQLApi,
  createApolloClient,
  createNetworkInterface
} = require("../api/createGraphQLApi");

const graphQLApi = createGraphQLApi(
  createApolloClient(createNetworkInterface(jest.fn()))
);

const ValidationError = require("../validation/ValidationError");
const Convert = require("./Convert");

describe("Convert", () => {
  let convert;
  let mockSchemaValidator;

  beforeEach(() => {
    mockSchemaValidator = {
      validate: jest.fn()
    };
    convert = new Convert(mockSchemaValidator);
  });

  describe("constructor", () => {
    it("expects a schema validator", () => {
      expect(() => new Convert()).toThrow();
    });

    it("should set schema validator as property", () => {
      expect(convert.schemaValidator).toBe(mockSchemaValidator);
    });
  });

  describe("behaviour", () => {
    let result;

    beforeEach(async () => {
      mockSchemaValidator.validate.mockReturnValue({ valid: true });
      result = await graphQLApi.getAuthorData(1);
    });

    it("should pass converted json to the schema validator", async () => {
      const converted = await convert.convert(result.data.questionnaire);
      expect(mockSchemaValidator.validate).toHaveBeenCalledWith(converted);
    });

    it("should error if resulting json is invalid", () => {
      mockSchemaValidator.validate.mockReturnValue({ valid: false });
      return expect(convert.convert(result.data.questionnaire)).rejects.toEqual(
        expect.any(ValidationError)
      );
    });
  });
});
