const SchemaValidator = require("../validation/SchemaValidator");

const EQ_RUNNER_MAIN_SCHEMA = require("../../data/schema_v1.json");
const EQ_RUNNER_UNITS_SCHEMA = require("../../data/units.json");
const EQ_RUNNER_CURRENCY_SCHEMA = require("../../data/currencies.json");

const createSchemaValidator = () =>
  new SchemaValidator(EQ_RUNNER_MAIN_SCHEMA, [
    {
      uri: "/units.json",
      schema: EQ_RUNNER_UNITS_SCHEMA
    },
    {
      uri: "/currencies.json",
      schema: EQ_RUNNER_CURRENCY_SCHEMA
    }
  ]);

module.exports = createSchemaValidator;
