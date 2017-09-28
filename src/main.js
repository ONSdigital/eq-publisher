/* eslint no-console: 0 */

const express = require("express");
const app = express();

const { getGraphQLApi } = require("./api/createGraphQLApi");
const Convert = require("./process/Convert");
const SchemaValidator = require("./validation/SchemaValidator");

const EQ_RUNNER_MAIN_SCHEMA = require("../data/schema_v1.json");
const EQ_RUNNER_UNITS_SCHEMA = require("../data/units.json");
const EQ_RUNNER_CURRENCY_SCHEMA = require("../data/currencies.json");

const PORT = process.env.PORT || 9000;

const schemaValidator = new SchemaValidator(EQ_RUNNER_MAIN_SCHEMA, [
  {
    uri: "/units.json",
    schema: EQ_RUNNER_UNITS_SCHEMA
  },
  {
    uri: "/currencies.json",
    schema: EQ_RUNNER_CURRENCY_SCHEMA
  }
]);
const converter = new Convert(schemaValidator);

const GraphQLApi = getGraphQLApi();

app.get("/graphql/:questionnaireId", async (req, res, next) => {
  try {
    const result = await GraphQLApi.getAuthorData(req.params.questionnaireId);

    if (result.data.questionnaire === null) {
      return next();
    }

    res.json(result);
  } catch (err) {
    res.json({
      result: "error",
      message: err.message,
      validation: err.validation
    });
  }
});

app.get("/publish/:questionnaireId", async (req, res, next) => {
  try {
    const result = await GraphQLApi.getAuthorData(req.params.questionnaireId);

    if (result.data.questionnaire === null) {
      return next();
    }

    res.json(converter.convert(result.data));
  } catch (err) {
    res.json({
      result: "error",
      message: err.message,
      validation: err.validation
    });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
