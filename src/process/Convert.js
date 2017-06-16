class Convert {

    constructor(schemaHelper, steps=[]) {
        this.schemaHelper = schemaHelper;
        this.steps = steps;

        this.convert.bind(this);
    }

    convert(authorJson) {
        let output = Object.assign({}, authorJson);

        this.steps.forEach(step => {
            const task = new step(this.schemaHelper);
            output = task.convert(output);
        });

        return output;
    }
}

module.exports = Convert;