const RenameProperties = require('../transform/RenameProperty');
const AddRequiredProperties = require('../transform/AddProperty');
const RemoveProperty = require('../transform/RemoveProperty');

class ConvertQuestionnaire {

    constructor(schemaHelper) {
        this.schemaHelper = schemaHelper;
    }

    convert(input) {

        let result = Object.assign({}, input);

        const transformations = [
            new RenameProperties({
                "id": "survey_id",
                "legalBasis": "legal_basis",
                "pages": "groups"
            }),
            new AddRequiredProperties(this.schemaHelper.getRequired('meta'), this.schemaHelper.getProperties('meta')),
            new RemoveProperty(Object.keys(this.schemaHelper.getProperties('meta')))
        ];

        transformations.forEach(t => result = t.transform(result));

        return result;
    }
}

module.exports = ConvertQuestionnaire;