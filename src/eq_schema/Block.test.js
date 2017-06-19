const Block = require('./Block');

describe('Block', () => {

    it('should should build valid runner Block from Author page', () => {

        const authorJson = {
            "id": 1,
            "title": "Introduction",
            "description": "Introduction",
            "questions": []
        };

        const block = new Block(authorJson);

        expect(block).toMatchObject({
            id: "block-1",
            title: "Introduction",
            description: "Introduction",
            sections: [{
                id: "section-1",
                questions: []
            }]
        });

    });

});