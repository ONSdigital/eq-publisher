class Transformer {

    constructor(transforms) {
        this.transforms = transforms;

        this.transform.bind(this);
    }

    transform(input) {
        // Clone the input.
        const result = Object.assign({}, input);

        // Loop through the transforms.
        Object.keys(this.transforms).forEach(key => {
            // If we find a transform that should happen.
            if(Object.keys(result).includes(key)) {
                // Add the new key into the result object;
                result[this.transforms[key]] = result[key];
                // Delete the old key.
                delete result[key];
            }
        });

        return result;
    }

}

module.exports = Transformer;