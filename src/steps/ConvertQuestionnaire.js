const RenameProperties = require('../transform/RenameProperty');
const AddRequiredProperties = require('../transform/AddProperty');
const RemoveProperty = require('../transform/RemoveProperty');

class ConvertQuestionnaire {

    constructor(schemaHelper) {
        this.properties = schemaHelper;
    }

    convert(input) {

        let result = Object.assign({}, input);

        const transformations = [
            new RenameProperties({
                "id": "survey_id",
                "legalBasis": "legal_basis",
                "pages": "groups"
            }),
            new AddRequiredProperties(this.properties.getRequired('meta'), this.properties.getProperties('meta')),
            new RemoveProperty(Object.keys(this.properties.getProperties('meta')))
        ];

        transformations.forEach(t => result = t.transform(result));

        return result;
    }
}

module.exports = ConvertQuestionnaire;