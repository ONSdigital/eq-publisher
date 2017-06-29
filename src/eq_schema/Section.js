const Question = require('./Question');

class Section {

    constructor(page) {
        this.questions = this.buildQuestions(page);
        this.id = 'section-' + page.id.toString();
        this.title = page.title;
    }

    buildQuestions(page) {
        return [new Question(page)];
    }

}

module.exports = Section;