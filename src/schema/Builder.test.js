const eqSchema = require('../../data/schema_v1.json');
const SchemaHelper = require('./SchemaHelper');

const build = require('./Builder');

describe('build property', () => {

    let schemaHelper;
    beforeAll(() => {
        schemaHelper = new SchemaHelper(eqSchema);
    });

    it('should build a new questionnaire', () => {
        const expected = {
            data_version: "0.0.1",
            description: "",
            groups: [],
            legal_basis: "Voluntary",
            mime_type: "",
            navigation: false,
            schema_version: "",
            session_prompt_in_seconds: 0,
            session_timeout_in_seconds: 0,
            survey_id: "",
            theme: "",
            title: "",
            messages: {}
        };

        expect(build(schemaHelper.getProperties('meta'), schemaHelper)).toEqual(expected);
    });

    it('should generate a valid group', () => {
        const expected = {
            blocks: [],
            completed_id: "",
            hide_in_navigation: false,
            highlight_when: [],
            routing_rules: [],
            title: "",
            skip_condition: []
        };

        expect(build(schemaHelper.getProperties('group'), schemaHelper)).toMatchObject(expected);
    });

});