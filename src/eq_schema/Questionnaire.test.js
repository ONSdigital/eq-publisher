/* eslint-disable camelcase */
const Questionnaire = require("./Questionnaire");
const Summary = require("./Summary");
const Group = require("./Group");
const { last } = require("lodash");

describe("Questionnaire", () => {
  const createQuestionnaireJSON = questionnaire =>
    Object.assign(
      {
        id: 1,
        title: "Quarterly Business Survey",
        description: "Quarterly Business Survey",
        theme: "default",
        legalBasis: "StatisticsOfTradeAct",
        navigation: false,
        sections: [
          {
            id: "1",
            title: "Section",
            pages: []
          }
        ]
      },
      questionnaire
    );

  let questionnaire;

  beforeEach(() => {
    questionnaire = new Questionnaire(createQuestionnaireJSON());
  });

  it("should build valid runner meta info", () => {
    expect(questionnaire).toMatchObject({
      mime_type: "application/json/ons/eq",
      schema_version: "0.0.1",
      data_version: "0.0.1",
      survey_id: "1",
      title: "Quarterly Business Survey",
      theme: "default",
      groups: [expect.any(Group)],
      legal_basis: "StatisticsOfTradeAct"
    });
  });

  it("should add a Summary to end of Questionnaire", () => {
    const questionnaire = new Questionnaire(createQuestionnaireJSON());
    const finalGroup = last(questionnaire.groups);
    const finalPage = last(finalGroup.blocks);

    expect(finalPage).toBeInstanceOf(Summary);
  });

  it("should include form_type and eq_id", () => {
    expect(questionnaire).toMatchObject({
      eq_id: "1",
      form_type: "1"
    });
  });
});
