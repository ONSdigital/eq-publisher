const ValidationApi = require("./ValidationApi");

describe("ValidationApi", () => {
  const url = "http://api.url";

  it("should accept the Api url in the constructor", () => {
    expect(new ValidationApi(url).validationApiUrl).toEqual(url);
  });

  describe("Call external validation service", () => {
    let validationApi;
    let mockRequest;

    beforeEach(() => {
      mockRequest = jest.genMockFromModule("request-promise");
      validationApi = new ValidationApi(url, mockRequest);
    });

    it("should pass the json to validation Api", () => {
      const json = { test: "json" };
      validationApi.validate(json);
      expect(mockRequest.post).toHaveBeenCalledWith(url, {
        body: json,
        json: true
      });
    });

    it("should return valid response", () => {
      mockRequest.post = jest.fn(() => Promise.resolve({}));
      expect(validationApi.validate({ test: "json" })).resolves.toEqual({
        valid: true
      });
    });

    it("should return invalid response", () => {
      const errors = {
        errors: { message: "Error message", detail: "Error details" }
      };
      mockRequest.post = jest.fn(() => Promise.resolve(errors));
      expect(validationApi.validate({ test: "json" })).resolves.toMatchObject({
        valid: false,
        errors: {
          message: "Error message",
          detail: "Error details"
        }
      });
    });
  });
});
