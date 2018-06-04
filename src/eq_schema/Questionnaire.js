/* eslint-disable camelcase */
const Section = require("./Section");
const Summary = require("./block-types/Summary");
const Confirmation = require("./block-types/Confirmation");
const { last } = require("lodash");

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
    this.sections = this.buildSections(questionnaireJson.sections);
    this.theme = questionnaireJson.theme;
    this.legal_basis = questionnaireJson.legalBasis;
    this.navigation = { visible: questionnaireJson.navigation };
    this.metadata = this.buildMetadata();

    this.buildSummaryOrConfirmation(questionnaireJson.summary);
  }

  buildSections(sections) {
    return sections.map(section => new Section(section));
  }

  buildSummaryOrConfirmation(summary) {
    const finalPage = summary ? new Summary() : new Confirmation();
    last(last(this.sections).groups).blocks.push(finalPage);
  }

  buildMetadata() {
    return {
      user_id: {
        validator: "string"
      },
      period_id: {
        validator: "string"
      },
      ru_name: {
        validator: "string"
      }
    };
  }
}

module.exports = Questionnaire;
