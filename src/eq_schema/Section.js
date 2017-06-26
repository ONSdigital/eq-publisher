const Question = require('./Question');

class Section {

    constructor(page) {
        this.questions = this.buildQuestions(page);
        this.id = 'section-' + page.id.toString();
        this.title = page.title;
    }

    buildQuestions(page) {
        const result = [];

        result.push(new Question(page));

        return result;
    }

}

module.exports = Section;