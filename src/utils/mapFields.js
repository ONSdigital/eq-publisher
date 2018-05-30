const { mapKeys, get, curry, isNil } = require("lodash");

module.exports = curry(function mapFields(mapping, key) {
  return mapping[key];
});
