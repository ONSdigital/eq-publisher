const createEmptyValue = require('./CreateEmptyValue');
const uuid = require('uuid/v4');

const merge = require('lodash').merge;

function buildProp(name, prop, schemaHelper) {
    const newProperty = {};

    if (name === 'id') {
        newProperty[name] = uuid();
    } else if (prop.hasOwnProperty('type')) {
        newProperty[name] = createEmptyValue(prop.type);
    } else if (prop.hasOwnProperty('enum') && prop.enum.length > 0) {
        newProperty[name] = prop.enum[0];
    } else if (prop.hasOwnProperty('ref')) {
        merge(newProperty, buildProp(name, schemaHelper.getDefinition(prop['ref']), schemaHelper));
    } else if (prop.hasOwnProperty('$ref')) {
        merge(newProperty, buildProp(name, schemaHelper.getDefinition(prop['$ref']), schemaHelper));
    }

    return newProperty;
}

function build(properties, schemaHelper) {
    let result = {};

    Object.keys(properties).forEach(key => {
        merge(result, buildProp(key, properties[key], schemaHelper));
    });

    return result;
}

module.exports = build;