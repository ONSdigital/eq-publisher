/* eslint-disable camelcase */
const { last } = require("lodash/fp");
const Answer = require("./Answer");

describe("Answer", () => {
  const createAnswerJSON = answer =>
    Object.assign(
      {
        id: 1,
        description: "This is a description",
        guidance: null,
        qCode: "51",
        label: "Number of male employees working more than 30 hours per week",
        mandatory: false,
        type: "PositiveInteger"
      },
      answer
    );

  // it("should generate  a valid eQ answer from an author answer", () => {
  //   const answer = new Answer(createAnswerJSON({ type: "PositiveInteger" }));

  //   expect(answer).toMatchObject({
  //     id: "answer-1",
  //     alias: "answer_1",
  //     type: "PositiveInteger",
  //     mandatory: false,
  //     description: "This is a description"
  //   });
  // });

  // it("should set currency to GBP for currency types", () => {
  //   const answer = new Answer(createAnswerJSON({ type: "Currency" }));
  //   expect(answer.currency).toBe("GBP");
  // });

  // describe("converting options", () => {
  //   it("should not add options for basic answer types", () => {
  //     const answer = new Answer(createAnswerJSON());
  //     expect(answer.options).toBeUndefined();
  //   });

  //   it("should add options for multiple choice answers", () => {
  //     const answer = new Answer(
  //       createAnswerJSON({
  //         type: "Radio",
  //         options: [
  //           {
  //             id: 1,
  //             label: "Option one",
  //             description: "A short description"
  //           },
  //           {
  //             id: 2,
  //             label: "Option two",
  //             description: "Another description"
  //           }
  //         ]
  //       })
  //     );

  //     expect(answer.options).toEqual([
  //       {
  //         label: "Option one",
  //         value: "Option one",
  //         description: "A short description"
  //       },
  //       {
  //         label: "Option two",
  //         value: "Option two",
  //         description: "Another description"
  //       }
  //     ]);
  //   });

  //   it("should omit child_answer_id if not supplied", () => {
  //     const answer = new Answer(
  //       createAnswerJSON({
  //         type: "Radio",
  //         options: [
  //           {
  //             id: 1,
  //             label: "Option one"
  //           },
  //           {
  //             id: 2,
  //             label: "Option two"
  //           }
  //         ]
  //       })
  //     );

  //     answer.options.forEach(option => {
  //       expect(option.hasOwnProperty("child_answer_id")).toBe(false);
  //     });
  //   });

  //   it("should add options even if empty array", () => {
  //     const answer = new Answer(createAnswerJSON({ options: [] }));
  //     expect(answer.options).toEqual([]);
  //   });
  // });

  // it("should omit option description if null value provided", () => {
  //   const answer = new Answer(
  //     createAnswerJSON({
  //       type: "Radio",
  //       options: [
  //         {
  //           id: 1,
  //           label: "Option one",
  //           description: null
  //         },
  //         {
  //           id: 2,
  //           label: "Option two",
  //           description: null
  //         }
  //       ]
  //     })
  //   );

  //   expect(answer.options).toEqual([
  //     {
  //       label: "Option one",
  //       value: "Option one"
  //     },
  //     {
  //       label: "Option two",
  //       value: "Option two"
  //     }
  //   ]);
  // });

  it('should generate an "other" option if answer has otherAnswer', () => {
    const otherAnswer = createAnswerJSON({ id: 3, type: "TextField" });
    const answer = new Answer(
      createAnswerJSON({
        type: "Checkbox",
        options: [
          {
            id: 1,
            label: "One"
          },
          {
            id: 2,
            label: "Two"
          }
        ],
        otherAnswer
      })
    );

    expect(answer.options).toHaveLength(3);
    expect(last(answer.options)).toMatchObject({
      label: "Other",
      value: "Other",
      child_answer_id: "3"
    });
  });
});
