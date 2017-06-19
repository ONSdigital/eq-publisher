const Section = require('./Section');

describe('Section', () => {

    it('should construct a valid eQ runner section from an Author page', () => {

        const authorJson = {
            "id": 1,
            "title": "Introduction",
            "description": "Introduction",
            "questions": []
        };

        const block = new Section(authorJson);

        expect(block).toMatchObject({
            id: "section-1",
            questions: []
        });

    });

});