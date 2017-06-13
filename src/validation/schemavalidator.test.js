const SchemaValidator = require('./schemavalidator');

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
        expect(result.errors.length).toBe(1);
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
        expect(result.errors.length).toBe(0);
    });

    it('should be able to load the JSON schema from eq-runner', () => {

    });

});