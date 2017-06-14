const Transformer = require('./Transformer');

describe('transformer', () => {

    let transforms;

    beforeAll(() => {
        transforms = {
            "from_property": "to_property",
            "from_property_2": "to_property_2"
        };
    });

    it('should allow us to define a set of transforms', () => {
        const testTransformer = new Transformer(transforms);
        expect(testTransformer.transforms).toBe(transforms);
    });

    it('should transform our data according to the transforms specified', () => {
        const testTransformer = new Transformer(transforms);

        const input = {
            should_not_be_affected: "data 1",
            from_property: "data 2",
            from_property_2: 42,
            should_not_be_affected_2: {
                data: "some data"
            }
        };

        const expected = {
            should_not_be_affected: "data 1",
            to_property: "data 2",
            to_property_2: 42,
            should_not_be_affected_2: {
                data: "some data"
            }
        };


        expect(testTransformer.transform(input)).toEqual(expected);
    });

});