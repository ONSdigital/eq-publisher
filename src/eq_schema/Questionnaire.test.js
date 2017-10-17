/* eslint-disable camelcase */
const Questionnaire = require("./Questionnaire");
const Summary = require("./Summary");
const Group = require("./Group");
const { last } = require("lodash");

describe("Questionnaire", () => {
  const createQuestionnaireJSON = questionnaire =>
    Object.assign(
      {
        id: "1",
        title: "Quarterly Business Survey",
        description: "Quarterly Business Survey",
        theme: "default",
        legalBasis: "StatisticsOfTradeAct",
        navigation: false,
        surveyId: "0112",
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
      survey_id: "0112",
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
    const questionnaireId = createQuestionnaireJSON().id;
    expect(questionnaire).toMatchObject({
      eq_id: questionnaireId,
      form_type: questionnaireId
    });
  });

  it("should build navigation", () => {
    const questionnaire = new Questionnaire(
      createQuestionnaireJSON({
        navigation: true,
        sections: [
          {
            id: "2",
            title: "Section number 2",
            pages: []
          },
          {
            id: "3",
            title: "Section number 3",
            pages: []
          }
        ]
      })
    );

    expect(questionnaire).toMatchObject({
      navigation: {
        visible: true,
        sections: [
          {
            title: "Section number 2",
            group_order: ["group-2"]
          },
          {
            title: "Section number 3",
            group_order: ["group-3"]
          }
        ]
      }
    });
  });

  it("should strip out HTML from navigation sections", () => {
    const questionnaire = new Questionnaire(
      createQuestionnaireJSON({
        navigation: true,
        sections: [
          {
            id: "2",
            title: "<p>Section <em>number</em> 2</p>",
            pages: []
          },
          {
            id: "3",
            title: "<p>Section <em>number</em> 3</p>",
            pages: []
          }
        ]
      })
    );

    expect(questionnaire).toMatchObject({
      navigation: {
        visible: true,
        sections: [
          {
            title: "Section number 2"
          },
          {
            title: "Section number 3"
          }
        ]
      }
    });
  });
});
