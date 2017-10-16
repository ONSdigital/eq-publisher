/* eslint-disable camelcase */
const Group = require("./Group");
const Summary = require("./Summary");
const { last } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Questionnaire {
  constructor(authorJson) {
    const questionnaireId = authorJson.id;
    this.eq_id = questionnaireId;
    this.form_type = questionnaireId;
    this.mime_type = "application/json/ons/eq";
    this.schema_version = "0.0.1";
    this.data_version = "0.0.1";
    this.survey_id = authorJson.surveyId;
    this.title = authorJson.title;
    this.groups = this.buildGroups(authorJson.sections);
    this.theme = authorJson.theme;
    this.legal_basis = authorJson.legalBasis;
    this.navigation = this.buildNavigation(
      authorJson.navigation,
      authorJson.sections
    );
  }

  buildGroups(sections) {
    const groups = sections.map(section => new Group(section));
    last(groups).blocks.push(new Summary());
    return groups;
  }

  buildNavigation(visible, sections) {
    return {
      visible,
      sections: sections.map(section => {
        return {
          title: getInnerHTML(section.title),
          group_order: [`group-${section.id}`]
        };
      })
    };
  }
}

module.exports = Questionnaire;
