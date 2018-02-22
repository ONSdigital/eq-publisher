const Block = require("./Block");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Group {
  constructor(id, title, description, pages) {
    this.id = `group-${id}`;
    this.title = getInnerHTML(title);
    this.blocks = this.buildBlocks(this.title, description, pages);
  }

  buildBlocks(title, description, pages) {
    return pages.map(page => new Block(title, description, page));
  }
}

module.exports = Group;
