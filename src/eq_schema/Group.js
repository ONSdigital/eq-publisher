const Block = require('./Block');

class Group {

    constructor(group) {
        this.id = "group-" + group.id.toString();
        this.title = group.title;
        this.blocks = this.buildBlocks(group.pages);
    }

    buildBlocks(pages) {
        return pages.map(page => new Block(page));
    }
}

module.exports = Group;