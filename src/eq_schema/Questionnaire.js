const Group = require('./Group');

class Questionnaire {

    constructor(authorJson) {
        this.mime_type = "application/json/ons/eq";
        this.schema_version = "0.0.1";
        this.data_version = "0.0.1";
        this.survey_id = authorJson.id.toString();
        this.title = authorJson.title;
        this.groups = this.buildSections(authorJson.sections);
        this.theme = authorJson.theme;
        this.legal_basis = authorJson.legalBasis;
    }

    buildSections(sections) {
        return sections.map(section => new Group(section));
    }

}

module.exports = Questionnaire;