const Block = require("./Block");
const Question = require("./Question");
const { set } = require("lodash");

const nextPageGoto = {
  __typename: "LogicalDestination",
  logicalDestination: "NextPage"
};

const endQuestionnaireGoto = {
  __typename: "LogicalDestination",
  logicalDestination: "EndOfQuestionnaire"
};

const absoluteSectionGoto = {
  __typename: "AbsoluteDestination",
  absoluteDestination: {
    __typename: "Section",
    id: 2
  }
};

const absolutePageGoto = {
  __typename: "AbsoluteDestination",
  absoluteDestination: {
    __typename: "QuestionPage",
    id: 2
  }
};

const secondCondition = {
  id: 2,
  comparator: "Equal",
  answer: {
    id: 3,
    options: [
      {
        id: 4,
        label: "pepperoni"
      },
      {
        id: 5,
        label: "pineapple"
      },
      {
        id: 6,
        label: "chorizo"
      }
    ]
  },
  routingValue: {
    value: [5, 6]
  }
};
const ctx = {
  summary: true,
  sections: [
    {
      id: 1,
      pages: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
      id: 2,
      pages: [{ id: 4 }, { id: 5 }, { id: 6 }]
    },
    {
      id: 3,
      pages: [{ id: 7 }, { id: 8 }, { id: 9 }]
    }
  ]
};

describe("Rule", () => {
  const createRuleJSON = (testOperation, destination) => ({
    id: 1,
    title: "Question 1",
    pageType: "Question",
    type: "General",
    answers: [],
    routingRuleSet: {
      else: destination,
      id: 1,
      routingRules: [
        {
          id: 1,
          operation: testOperation,
          goto: destination,
          conditions: [
            {
              id: 1,
              comparator: "Equal",
              answer: {
                id: 2,
                options: [
                  {
                    id: 1,
                    label: "yes"
                  },
                  {
                    id: 2,
                    label: "no"
                  },
                  {
                    id: 3,
                    label: "maybe"
                  }
                ]
              },
              routingValue: {
                value: [1, 2]
              }
            }
          ]
        }
      ]
    }
  });

  it("should build valid runner routing to next page", () => {
    const testOperation = "And";

    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, nextPageGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer2", condition: "equals", value: "yes" },
              { id: "answer2", condition: "equals", value: "no" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing to the End of Questionnaire", () => {
    const testOperation = "And";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, endQuestionnaireGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "summary-group",
            when: [
              { id: "answer2", condition: "equals", value: "yes" },
              { id: "answer2", condition: "equals", value: "no" }
            ]
          }
        },
        { goto: { group: "summary-group" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to page with And", () => {
    const testOperation = "And";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, absolutePageGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer2", condition: "equals", value: "yes" },
              { id: "answer2", condition: "equals", value: "no" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to section with And", () => {
    const testOperation = "And";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, absoluteSectionGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [
              { id: "answer2", condition: "equals", value: "yes" },
              { id: "answer2", condition: "equals", value: "no" }
            ]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to page with Or", () => {
    const testOperation = "Or";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, absolutePageGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        {
          goto: {
            block: "block2",
            when: [{ id: "answer2", condition: "equals", value: "no" }]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to section with Or", () => {
    const testOperation = "Or";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, absoluteSectionGoto),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "equals", value: "no" }]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });

  it("should build valid runner routing from Author with multiple And'ed conditions", () => {
    const testOperation = "And";
    let mulitCondtions = createRuleJSON(testOperation, absoluteSectionGoto);

    set(
      mulitCondtions,
      "routingRuleSet.routingRules[0].conditions[1]",
      secondCondition
    );

    const block = new Block(
      "section title",
      "section description",
      mulitCondtions,
      ctx
    );

    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [
              { id: "answer2", condition: "equals", value: "yes" },
              { id: "answer2", condition: "equals", value: "no" },
              { id: "answer3", condition: "equals", value: "pineapple" },
              { id: "answer3", condition: "equals", value: "chorizo" }
            ]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });

  it("should build valid runner routing from Author with multiple Or'ed conditions", () => {
    const testOperation = "Or";
    let mulitCondtions = createRuleJSON(testOperation, absoluteSectionGoto);

    set(
      mulitCondtions,
      "routingRuleSet.routingRules[0].conditions[1]",
      secondCondition
    );

    const block = new Block(
      "section title",
      "section description",
      mulitCondtions,
      ctx
    );

    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "equals", value: "no" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer3", condition: "equals", value: "pineapple" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer3", condition: "equals", value: "chorizo" }]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });
});
