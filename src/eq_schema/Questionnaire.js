const Group = require('./Group');

class Questionnaire {

    constructor(authorJson) {
        this.mime_type = "application/json/ons/eq";
        this.schema_version = "0.0.1";
        this.data_version = "0.0.1";
        this.survey_id = authorJson.id.toString();
        this.title = authorJson.title;
        this.groups = this.buildGroups(authorJson.groups);
        this.theme = authorJson.theme;
        this.legal_basis = authorJson.legalBasis;
    }

    buildGroups(groups) {
        return groups.map(group => new Group(group));
    }

}

module.exports = Questionnaire;