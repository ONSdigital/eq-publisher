class Convert {

    constructor(schemaHelper, steps=[]) {
        this.schemaHelper = schemaHelper;
        this.steps = steps;

        this.convert.bind(this);
    }

    convert(authorJson) {
        // TODO Transform authorJson to EQ schema valid JSON
        const result = Object.assign({}, authorJson);
        return result;
    }
}

module.exports = Convert;