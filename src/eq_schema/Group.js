const Block = require("./Block");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Group {
  constructor(id, title, pages, ctx) {
    this.id = `group${id}`;
    this.title = getInnerHTML(title);
    this.blocks = this.buildBlocks(this.title, pages, ctx);
  }

  buildBlocks(title, pages, ctx) {
    return pages.map(page => new Block(title, page, ctx));
  }
}

module.exports = Group;
