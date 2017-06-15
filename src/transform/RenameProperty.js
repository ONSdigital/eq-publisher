class RenameProperty {

    constructor(renameTransforms) {
        this.renameTransforms = renameTransforms;
    }

    transform(input) {
        // Clone the input.
        const result = Object.assign({}, input);

        // Loop through the renameTransforms.
        Object.keys(this.renameTransforms).forEach(key => {
            // If we find a transform that should happen.
            if(Object.keys(result).includes(key)) {
                // Add the new key into the result object;
                result[this.renameTransforms[key]] = result[key];
                // Delete the old key.
                delete result[key];
            }
        });

        return result;
    }

}

module.exports = RenameProperty;