const Question = require('./Question');

class Section {

    constructor(page) {
        this.id = 'section-' + page.id.toString();
        this.title = page.title;
        this.questions = this.buildQuestions(page.questions);
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