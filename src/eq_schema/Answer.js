class Answer {

    constructor(answer) {
        this.id = 'answer-' + answer.id.toString();
        this.mandatory = answer.mandatory;
        this.type = answer.type;
        this.label = answer.label;
    }

}

module.exports = Answer;