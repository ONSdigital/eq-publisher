const Question = require('./Question');

describe('Question', () => {

    it('should construct a valid eQ runner question from an author question', () => {

        const authorJson = {
            "id": 1,
            "title": "question title",
            "description": "question description",
            "guidance": "question guidance",
            "type": "General",
            "mandatory": false,
            "answers": []
        };

        const question = new Question(authorJson);

        expect(question).toMatchObject({
            id: "question-1",
            title: "question title",
            type: "General",
            answers: []
        });

    });

});