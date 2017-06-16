const schema = require('../../data/schema_v1.json');
const SchemaValidator = require('../validation/SchemaValidator');
const SchemaGenerator = require('./SchemaGenerator');

describe('schema generator', () => {

    it('should generate a valid eQ schema', () => {
        const generator = new SchemaGenerator(schema);
        const validator = new SchemaValidator(schema);

        const result = generator.generate();

        console.warn(result);
        console.error(validator.validate(result));
        expect(validator.validate(result).valid).toBe(true);
    });

});