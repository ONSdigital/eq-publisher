/* eslint-disable camelcase */
const Group = require("./Group");
const Summary = require("./Summary");
const { last } = require("lodash");

class Questionnaire {
  constructor(authorJson) {
    this.mime_type = "application/json/ons/eq";
    this.schema_version = "0.0.1";
    this.data_version = "0.0.1";
    this.survey_id = authorJson.id.toString();
    this.title = authorJson.title;
    this.groups = this.buildGroups(authorJson.sections);
    this.theme = authorJson.theme;
    this.legal_basis = authorJson.legalBasis;
  }

  buildGroups(sections) {
    const groups = sections.map(section => new Group(section));
    last(groups).blocks.push(new Summary());
    return groups;
  }
}

module.exports = Questionnaire;
