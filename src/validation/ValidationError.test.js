const ValidationError = require("./ValidationError");

describe("validation error", () => {
  it("should accept message", () => {
    const validationError = new ValidationError("message", null);
    expect(validationError.message).toEqual("message");
  });

  it("should accept a validation object", () => {
    const mockValidationObject = {
      validationErrors: [
        {
          error: "some error",
          description: "some description"
        }
      ]
    };

    const validationError = new ValidationError(null, mockValidationObject);

    expect(validationError.validation).toBe(mockValidationObject);
  });

  it("should override toString", () => {
    const mockValidationObject = {
      validationErrors: [
        {
          error: "some error",
          description: "some description"
        }
      ]
    };

    const validationError = new ValidationError(
      "Error message",
      mockValidationObject
    );
    const errorMessage = validationError.toString();

    expect(errorMessage).toContain("Error message");
    expect(errorMessage).toContain(JSON.stringify(mockValidationObject));
  });
});
