const RemoveProperty = require('./RemoveProperty');

describe('Remove property', () => {

    it('should remove all schemaHelper when no allowed schemaHelper', () => {

        const allowedProperties = [];
        const removeProperty = new RemoveProperty(allowedProperties);

        const input = {
            one: "one",
            two: "two",
            three: "three"
        };

        expect(removeProperty.transform(input)).toEqual({});

    });

    it('should remove schemaHelper not listed in allowed schemaHelper', () => {

        const allowedProperties = ['two'];
        const removeProperty = new RemoveProperty(allowedProperties);

        const input = {
            one: "one",
            two: "two",
            three: "three"
        };

        const expected = {
            two: "two"
        };

        expect(removeProperty.transform(input)).toEqual(expected);

    });

});