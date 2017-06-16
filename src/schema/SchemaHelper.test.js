const SchemaHelper = require('./SchemaHelper')
const eqSchema = require('../../data/schema_v1.json');

describe('schema helper', () => {

    it('should accept a schema', () => {
        const schemaHelper = new SchemaHelper(eqSchema);
        expect(schemaHelper.meta).toEqual(eqSchema);
    });

    describe('getRequired', () => {

        it('should throw error if element is not a key of helper', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
            expect(() => schemaHelper.getRequired('not-in-schema')).toThrow();
        });

        it('should return required meta elements when requested', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
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
            expect(schemaHelper.getRequired('meta')).toEqual(expected);
        });

        it('should return required question elements when requested', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
            const expected = [
                "id",
                "type",
                "mandatory",
            ];
            expect(schemaHelper.getRequired('answers')).toEqual(expected);
        });

    });


    describe('getProperties', () => {

        it('should throw error when elem is not in schema keys', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
            expect(() => schemaHelper.getProperties('not-in-schema')).toThrow();
        });

        it('should return meta properties when called with "meta"', () => {
            const schemaHelper = new SchemaHelper(eqSchema);

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

            expect(Object.keys(schemaHelper.getProperties('meta'))).toEqual(expectedKeys);
        });

        it('should return questions properties when called with "questions"', () => {
            const schemaHelper = new SchemaHelper(eqSchema);

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

            expect(Object.keys(schemaHelper.getProperties('questions'))).toEqual(expectedKeys);
        });

    });

    describe('getDefinition', () => {

        it('should error when invalid reference passed in', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
            expect(() => schemaHelper.getDefinition('#/not/a/valid/ref')).toThrow();
        });

        it('should error when ref not found in schema', () => {
           const schemaHelper = new SchemaHelper(eqSchema);
           expect(() => schemaHelper.getDefinition('#/definitions/notfound')).toThrow();
        });

        it('should return definition when found in the schema', () => {
            const schemaHelper = new SchemaHelper(eqSchema);
            const expected = {
                "type": "string",
                "description": "A lowercase alphanumeric string separated by hyphens.",
                "pattern": "^[a-z0-9][a-z0-9\\-]*[a-z0-9]$"

            };
            expect(schemaHelper.getDefinition('#/definitions/id')).toEqual(expected);
        });

    });

});