/* eslint-disable camelcase */
const SchemaValidator = require("./SchemaValidator");
const EQ_RUNNER_MAIN_SCHEMA = require("../../data/schema_v1.json");
const QBS_SURVEY = require("../../data/2_0001.json");
const EQ_RUNNER_UNITS_SCHEMA = require("../../data/units.json");
const EQ_RUNNER_CURRENCY_SCHEMA = require("../../data/currencies.json");

describe("Schema validator", () => {
  it("should accept JSON schema in its constructor", () => {
    const schemaValidator = new SchemaValidator("{}");
    expect(schemaValidator.mainSchema).toEqual("{}");
  });

  it("should validate json against the schema", () => {
    const jsonSchema = {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object"
    };
    const schemaValidator = new SchemaValidator(jsonSchema);
    const result = schemaValidator.validate({});

    expect(result.valid).toBe(true);
  });

  it("should fail validation when json does not match schema", () => {
    const jsonSchema = {
      type: "object",
      schemaHelper: [
        {
          message: {
            type: "string"
          }
        }
      ],
      required: ["message"]
    };

    const schemaValidator = new SchemaValidator(jsonSchema);
    const result = schemaValidator.validate({});

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].argument).toBe("message");
    expect(result.errors[0].name).toBe("required");
  });

  it("should pass validation when json matches schema", () => {
    const jsonSchema = {
      type: "object",
      schemaHelper: [
        {
          message: {
            type: "string"
          }
        }
      ],
      required: ["message"]
    };

    const schemaValidator = new SchemaValidator(jsonSchema);
    const result = schemaValidator.validate({
      message: "Hello world!"
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should be able to load the JSON schema from eq-runner", () => {
    expect(EQ_RUNNER_MAIN_SCHEMA).toBeDefined();
    expect(EQ_RUNNER_MAIN_SCHEMA.$schema).toBe(
      "http://json-schema.org/draft-04/schema#"
    );
  });

  describe("validate using sub schemas for units and currencies", () => {
    let schemaValidator;

    beforeEach(() => {
      schemaValidator = new SchemaValidator(EQ_RUNNER_MAIN_SCHEMA, [
        {
          uri: "/units.json",
          schema: EQ_RUNNER_UNITS_SCHEMA
        },
        {
          uri: "/currencies.json",
          schema: EQ_RUNNER_CURRENCY_SCHEMA
        }
      ]);
    });

    it("should pass validation against schema for existing questionnaire", () => {
      const result = schemaValidator.validate(QBS_SURVEY);
      expect(result.valid).toBe(true);
    });

    it("should fail validation against EQ schema if something is wrong with questionnaire", () => {
      QBS_SURVEY.mime_type = 42; // According to schema this should be a string!!!

      const result = schemaValidator.validate(QBS_SURVEY);

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].message).toBe("is not of a type(s) string");
    });
  });
});
