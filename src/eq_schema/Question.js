const Answer = require('./Answer');

class Question {

    constructor(question) {
        this.id = 'question-' + question.id.toString();
        this.title = question.title;
        this.type = question.type;
        this.answers = this.buildAnswers(question.answers)
    }

    buildAnswers(answers) {
        return answers.map(answer => new Answer(answer));
    }

}

module.exports = Question;