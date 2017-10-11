const Block = require("./Block");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Group {
  constructor(section) {
    this.id = `group-${section.id}`;
    this.title = getInnerHTML(section.title);
    this.blocks = this.buildBlocks(this.title, section.pages);
  }

  buildBlocks(title, pages) {
    return pages.map(page => new Block(title, page));
  }
}

module.exports = Group;
