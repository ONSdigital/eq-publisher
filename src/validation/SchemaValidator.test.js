const SchemaValidator = require('./SchemaValidator');
const eqJsonSchema = require('../../data/schema_v1.json');
const quarterlyBusinessSurvey = require('../../data/2_0001.json');

describe('Schema validator', () => {

    it('should accept JSON schema in its constructor', () => {
        const schemaValidator = new SchemaValidator('{}');
        expect(schemaValidator.jsonSchema).toEqual('{}');
    });

    it('should validate json against the schema', () => {
        const jsonSchema = {
            $schema: "http://json-schema.org/draft-04/schema#",
            type: "object"
        };
        const schemaValidator = new SchemaValidator(jsonSchema);
        const result = schemaValidator.validate({});

        expect(result.valid).toBe(true);
    });

    it('should fail validation when json does not match schema', () => {
        const jsonSchema = {
            type: "object",
            properties: [{
                "message": {
                    "type": "string"
                }
            }],
            required: ["message"]
        };

        const schemaValidator = new SchemaValidator(jsonSchema);
        const result = schemaValidator.validate({});

        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].argument).toBe('message');
        expect(result.errors[0].name).toBe('required');
    });

    it('should pass validation when json matches schema', () => {
        const jsonSchema = {
            type: "object",
            properties: [{
                "message": {
                    "type": "string"
                }
            }],
            required: ["message"]
        };

        const schemaValidator = new SchemaValidator(jsonSchema);
        const result = schemaValidator.validate({
            "message": "Hello world!"
        });

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should be able to load the JSON schema from eq-runner', () => {
        expect(eqJsonSchema).toBeDefined();
        expect(eqJsonSchema.$schema).toBe('http://json-schema.org/draft-04/schema#')
    });

    it('should pass validation against schema for existing questionnaire', () => {
        const schemaValidator = new SchemaValidator(eqJsonSchema);
        const result = schemaValidator.validate(quarterlyBusinessSurvey);

        expect(result.valid).toBe(true);
        expect(quarterlyBusinessSurvey.title).toBe('Quarterly Business Survey');
    });

    it('should fail validation against EQ schema if something is wrong with questionnaire', () => {
        const schemaValidator = new SchemaValidator(eqJsonSchema);
        quarterlyBusinessSurvey.mime_type = 42; // According to schema this should be a string!!!

        const result = schemaValidator.validate(quarterlyBusinessSurvey);

        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe('is not of a type(s) string');
    });

});