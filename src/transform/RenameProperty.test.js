const RemameProperty = require('./RenameProperty');

describe('transformer', () => {

    let renameTransforms;

    beforeAll(() => {
        renameTransforms = {
            "from_property": "to_property",
            "from_property_2": "to_property_2"
        };
    });

    it('should allow us to define a set of renameTransforms', () => {
        const renameProperty = new RemameProperty(renameTransforms);
        expect(renameProperty.renameTransforms).toBe(renameTransforms);
    });

    it('should build our data according to the renameTransforms specified', () => {
        const renameProperty = new RemameProperty(renameTransforms);

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


        expect(renameProperty.transform(input)).toEqual(expected);
    });

});