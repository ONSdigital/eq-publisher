const getAuthorData = require("../api/MockGraphQLApi").getAuthorData;

const Convert = require("./Convert");

describe("Convert", () => {
  describe("constructor", () => {
    it("expects a schema validator", () => {
      expect(() => new Convert()).toThrow();
    });

    it("should set schema validator as property", () => {
      const mockSchemaValidator = jest.fn();
      const convert = new Convert(mockSchemaValidator);

      expect(convert.schemaValidator).toBe(mockSchemaValidator);
    });
  });

  describe("behaviour", () => {
    it("should validate result against schema", async () => {
      const mockSchemaValidator = {
        validate: jest.fn()
      };

      mockSchemaValidator.validate.mockReturnValue({ valid: true });

      const result = await getAuthorData(2);
      const convert = new Convert(mockSchemaValidator);
      convert.convert(result.data);

      expect(mockSchemaValidator.validate).toBeCalled();
    });

    it("should error if resulting json is invalid", async () => {
      const mockSchemaValidator = {
        validate: jest.fn()
      };

      mockSchemaValidator.validate.mockReturnValue({ valid: false });

      const convert = new Convert(mockSchemaValidator);

      const result = await getAuthorData(1);

      expect(() => convert.convert(result.data)).toThrow();
    });
  });
});
