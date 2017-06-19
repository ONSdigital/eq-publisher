const Section = require('./Section');

class Block {

    constructor(page) {
        this.id = 'block-' + page.id.toString();
        this.title = page.title;
        this.description = page.description;
        this.type = page.type;
        this.sections = this.buildSections(page);
    }

    buildSections(page) {
        const result = [];

        result.push(new Section(page));

        return result;
    }

}

module.exports = Block;