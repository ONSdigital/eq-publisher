const Block = require("./Block");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Group {
  constructor(section) {
    this.id = `group-${section.id}`;
    this.title = getInnerHTML(section.title);
    this.blocks = this.buildBlocks(section.pages);
  }

  buildBlocks(pages) {
    return pages.map(page => new Block(page));
  }
}

module.exports = Group;
