const SchemaParser = require('./SchemaParser')
const eqSchema = require('../../data/schema_v1.json');

describe('schema parser', () => {

    it('should accept a schema', () => {
        const schemaParser = new SchemaParser(eqSchema);
        expect(schemaParser.meta).toEqual(eqSchema);
    });

    describe('getRequired', () => {

        it('should return empty array if element is not a key of parser', () => {
            const schemaParser = new SchemaParser(eqSchema);
            expect(schemaParser.getRequired('not-in-schema')).toEqual([]);
        });

        it('should return required meta elements when requested', () => {
            const schemaParser = new SchemaParser(eqSchema);
            const expected = [
                "mime_type",
                "schema_version",
                "data_version",
                "survey_id",
                "title",
                "groups",
                "theme",
                "legal_basis"
            ];
            expect(schemaParser.getRequired('meta')).toEqual(expected);
        });

        it('should return required question elements when requested', () => {
            const schemaParser = new SchemaParser(eqSchema);
            const expected = [
                "id",
                "type",
                "mandatory",
            ];
            expect(schemaParser.getRequired('answers')).toEqual(expected);
        });

    });


    describe('getProperties', () => {

        it('should return empty object when elem is not in schema keys', () => {
            const schemaParser = new SchemaParser(eqSchema);
            expect(schemaParser.getProperties('not-in-schema')).toEqual({});
        });

        it('should return meta properties when called with "meta"', () => {
            const schemaParser = new SchemaParser(eqSchema);

            const expectedKeys = [
                "mime_type",
                "schema_version",
                "data_version",
                "survey_id",
                "session_timeout_in_seconds",
                "session_prompt_in_seconds",
                "title",
                "description",
                "theme",
                "legal_basis",
                "navigation",
                "messages",
                "groups"
            ];

            expect(Object.keys(schemaParser.getProperties('meta'))).toEqual(expectedKeys);
        });

        it('should return questions properties when called with "questions"', () => {
            const schemaParser = new SchemaParser(eqSchema);

            const expectedKeys = [
                "id",
                "title",
                "number",
                "description",
                "guidance",
                "skip_condition",
                "type",
                "answers"
            ];

            expect(Object.keys(schemaParser.getProperties('questions'))).toEqual(expectedKeys);
        });

    });

});