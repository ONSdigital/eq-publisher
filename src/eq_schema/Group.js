const Block = require("./Block");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Group {
  constructor(id, title, description, pages, ctx) {
    this.id = `group${id}`;
    this.title = getInnerHTML(title);
    this.blocks = this.buildBlocks(this.title, description, pages, ctx);
  }

  buildBlocks(title, description, pages, ctx) {
    return pages.map(page => new Block(title, description, page, ctx));
  }
}

module.exports = Group;
