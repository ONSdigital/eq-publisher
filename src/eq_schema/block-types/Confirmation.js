class Confirmation {
  constructor() {
    this.type = "Confirmation";
    this.id = "confirmation";
    this.description = "";
    this.questions = [
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
    ];
    this.title = "You are now ready to submit this survey";
  }
}

module.exports = Confirmation;
