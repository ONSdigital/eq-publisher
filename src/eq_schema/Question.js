const Answer = require('./Answer');

class Question {

    constructor(question) {
        this.id = 'question-' + question.id.toString();
        this.title = question.title;
        this.type = question.type;
        this.answers = this.buildAnswers(question.answers)
    }

    buildAnswers(answers) {
        const result = [];

        answers.map(answer => {
            result.push(new Answer(answer));
        });

        return result;
    }

}

module.exports = Question;