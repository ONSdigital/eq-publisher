class Convert {

    constructor(schemaGenerator) {
        this.schemaGenerator = schemaGenerator;
    }

    convert(authorJson) {
        let output = Object.assign({}, this.schemaGenerator.generate());

        // TODO Generate a valid empty eQ schema

        // TODO Go through the Author schema and transform / set values as necessary
        return output;
    }
}

module.exports = Convert;