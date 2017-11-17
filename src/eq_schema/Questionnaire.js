/* eslint-disable camelcase */
const Group = require("./Group");
const Summary = require("./block-types/Summary");
const Confirmation = require("./block-types/Confirmation");
const { last } = require("lodash");
const { getText } = require("../utils/HTMLUtils");

class Questionnaire {
  constructor(questionnaireJson) {
    const questionnaireId = questionnaireJson.id;
    this.eq_id = questionnaireId;
    this.form_type = questionnaireId;
    this.mime_type = "application/json/ons/eq";
    this.schema_version = "0.0.1";
    this.data_version = "0.0.2";
    this.survey_id = questionnaireJson.surveyId || questionnaireId;
    this.title = questionnaireJson.title;
    this.groups = this.buildGroups(questionnaireJson.sections);
    this.theme = questionnaireJson.theme;
    this.legal_basis = questionnaireJson.legalBasis;
    this.navigation = this.buildNavigation(
      questionnaireJson.navigation,
      questionnaireJson.sections
    );

    this.buildSummaryOrConfirmation(questionnaireJson.summary);
  }

  buildGroups(sections) {
    return sections.map(section => new Group(section));
  }

  buildSummaryOrConfirmation(summary) {
    const finalPage = summary ? new Summary() : new Confirmation();
    last(this.groups).blocks.push(finalPage);
  }

  buildNavigation(visible, sections) {
    return {
      visible,
      sections: sections.map(section => {
        return {
          title: getText(section.title),
          group_order: [`group-${section.id}`]
        };
      })
    };
  }
}

module.exports = Questionnaire;
