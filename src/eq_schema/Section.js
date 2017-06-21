const Question = require('./Question');

class Section {

    constructor(page) {
        this.questions = this.buildQuestions(page.questions);
        this.id = 'section-' + page.id.toString();
        this.title = page.title;
    }

    buildQuestions(questions) {
        const result = [];

        questions.forEach(question => {
            result.push(new Question(question));
        });

        return result;
    }

}

module.exports = Section;