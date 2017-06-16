const AddProperty = require('./AddProperty');

describe('property filler', () => {

    it('should accept required schemaHelper and optional property hints', () => {
        const addProperty = new AddProperty([], {hint: "hint"});
        expect(addProperty.required).toEqual([]);
        expect(addProperty.schemaHelper).toEqual({hint: "hint"})
    });

    it('should add required schemaHelper to object if they do not exist', () => {
        const required = ['required_1', 'required_2'];
        const addProperty = new AddProperty(required, {hint: "hint"});

        expect(Object.keys(addProperty.transform({}))).toEqual(required);
    });

    it('should add missing required schemaHelper even if some are present', () => {
        const required = ['required_1', 'required_2'];
        const addProperty = new AddProperty(required, {hint: "hint"});

        const result = addProperty.transform({"required_1": "in the input"});

        expect(Object.keys(result)).toEqual(required);
        expect(result.required_1).toEqual('in the input');
    });

    it('should use property hints to intelligently fill in missing schemaHelper', () => {

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

        const addProperty = new AddProperty(required, properties);
        const result = addProperty.transform({});

        expect(result.required_string).toEqual('');
        expect(result.required_boolean).toEqual(Boolean());
        expect(result.required_array).toEqual([]);
        expect(result.required_object).toEqual({});
    });

    it('should intelligently fill in enum values', () => {

        const required = ['required_enum'];
        const properties = {
            required_enum: {
                enum: [
                    "Questionnaire",
                    "Interstitial",
                    "Introduction",
                    "Summary",
                    "Confirmation"
                ]
            }
        };

        const addProperty = new AddProperty(required, properties);
        expect(addProperty.transform({})).toEqual({
            required_enum: "Questionnaire"
        })

    });

});