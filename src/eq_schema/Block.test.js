const Block = require('./Block');

describe('Block', () => {

  it('should should build valid runner Block from Author page', () => {

    const authorJson = {
      "id": 1,
      "title": "Question 1",
      "description": "This is quesstion 1",
      "guidance": "",
      "pageType": "Question",
      "type": "General",
      "mandatory": false,
      "answers": []
    };

    const block = new Block(authorJson);

    expect(block).toMatchObject({
      id: "block-1",
      title: "Question 1",
      description: "This is quesstion 1",
      sections: [{
        id: "section-1",
        questions: [{
          id: "question-1",
          title: "Question 1",
          type: "General",
          answers: []
        }]
      }]
    });

  });

});