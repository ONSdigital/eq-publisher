const RemoveProperty = require('./RemoveProperty');

describe('Remove property', () => {

    it('should remove all properties when no allowed properties', () => {

        const allowedProperties = [];
        const removeProperty = new RemoveProperty(allowedProperties);

        const input = {
            one: "one",
            two: "two",
            three: "three"
        };

        expect(removeProperty.transform(input)).toEqual({});

    });

    it('should remove properties not listed in allowed properties', () => {

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