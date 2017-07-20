const Section = require("./Section");

const get = require("lodash").get;

class Block {
  constructor(page) {
    this.id = "block-" + page.id.toString();
    this.title = page.title;
    this.description = page.description;
    this.type = this.convertPageType(page.pageType);
    this.sections = this.buildSections(page);
  }

  buildSections(page) {
    const result = [];

    result.push(new Section(page));

    return result;
  }

  convertPageType(type) {
    const mappings = {
      QuestionPage: "Questionnaire",
      InterstitialPage: "Interstitial"
    };

    return get(mappings, type, type);
  }
}

module.exports = Block;
