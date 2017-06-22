const Question = require('./Question');

class Section {

    constructor(page) {
        this.questions = this.buildQuestions(page.questions);
        this.id = 'section-' + page.id.toString();
        this.title = page.title;
    }

    buildQuestions(questions) {
        return questions.map(question => new Question(question));
    }

}

module.exports = Section;