class Confirmation {
  constructor() {
    this.id = "confirmation-group";
    this.title = "confirmation";
    this.blocks = [
      {
        title: "You are now ready to submit this survey",
        type: "Confirmation",
        id: "confirmation",
        description: "",
        questions: [
          {
            answers: [],
            id: "ready-to-submit-completed-question",
            title: "Submission",
            type: "General",
            guidance: {
              content: [
                {
                  list: [
                    "You will not be able to access or change your answers on submitting the questionnaire",
                    "If you wish to review your answers please select the relevant completed sections"
                  ]
                }
              ]
            }
          }
        ]
      }
    ];
  }
}

module.exports = Confirmation;
