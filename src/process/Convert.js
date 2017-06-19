class Convert {

    constructor(schemaGenerator, schemaValidator, performTransforms) {
        this.schemaGenerator = schemaGenerator;
        this.schemaValidator = schemaValidator;
        this.performTransforms = performTransforms;
    }

    convert(authorJson) {

        // Step 1: Generate a valid empty eQ schema
        let output = Object.assign({}, this.schemaGenerator.generate());

        // TODO Step 2: Go through the Author schema and transform / set values in output as necessary
        output = this.performTransforms(output, authorJson);

        // Step 3: Ensure the output is valid eQ schema
        if (!this.schemaValidator.validate(output).valid) {
            throw Error('Converted author schema is not valid EQ schema.');
        }

        return output;
    }
}

module.exports = Convert;