const PropertyFiller = require('./PropertyFiller');

describe('property filler', () => {

    it('should accept required properties and optional property hints', () => {
        const testPropertyFiller = new PropertyFiller([], {hint: "hint"});
        expect(testPropertyFiller.required).toEqual([]);
        expect(testPropertyFiller.properties).toEqual({hint: "hint"})
    });

    it('should add required properties to object if they do not exist', () => {
        const required = ['required_1', 'required_2'];
        const testPropertyFiller = new PropertyFiller(required, {hint: "hint"});

        expect(Object.keys(testPropertyFiller.transform({}))).toEqual(required);
    });

    it('should add missing required properties even if some are present', () => {
        const required = ['required_1', 'required_2'];
        const testPropertyFiller = new PropertyFiller(required, {hint: "hint"});

        const result = testPropertyFiller.transform({"required_1": "in the input"});

        expect(Object.keys(result)).toEqual(required);
        expect(result.required_1).toEqual('in the input');
    });

    it('should use property hints to intelligently fill in missing properties', () => {

        const required = ['required_string', 'required_boolean', 'required_array', 'required_object'];
        const properties = {
            required_string: {
                type: "string"
            },
            required_boolean: {
                type: "boolean"
            },
            required_array: {
                type: "array"
            },
            required_object: {
                type: "object"
            }
        };

        const testPropertyFiller = new PropertyFiller(required, properties);
        const result = testPropertyFiller.transform({});

        expect(result.required_string).toEqual('');
        expect(result.required_boolean).toEqual(Boolean());
        expect(result.required_array).toEqual([]);
        expect(result.required_object).toEqual({});
    });

    it('should intelligently fill in enum values', () => {

        const required = ['required_enum'];
        const properties = {
            required_enum: {
                type: {
                    enum: [
                        "Questionnaire",
                        "Interstitial",
                        "Introduction",
                        "Summary",
                        "Confirmation"
                    ]
                }
            }
        };

        const testPropertyFiller = new PropertyFiller(required, properties);
        expect(testPropertyFiller.transform({})).toEqual({
            required_enum: "Questionnaire"
        })

    });

});