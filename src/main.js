const express = require("express");
const logger = require("pino")();
const pino = require("express-pino-logger");
const errorHandler = require("./middleware/errorHandler");
const fetchData = require("./middleware/fetchData");
const schemaConverter = require("./middleware/schemaConverter");
const respondWithData = require("./middleware/respondWithData");
const status = require("./middleware/status");
const noContent = require("./middleware/nocontent");
const { isNil } = require("lodash");

const Convert = require("./process/Convert");
const SchemaValidator = require("./validation/SchemaValidator");
const ValidationApi = require("./validation/ValidationApi");
const { getGraphQLApi } = require("./api/createGraphQLApi");

if (isNil(process.env.EQ_SCHEMA_VALIDATOR_URL)) {
  throw Error("EQ_SCHEMA_VALIDATOR_URL not specified");
}

if (isNil(process.env.EQ_AUTHOR_API_URL)) {
  logger.warn(
    "EQ_AUTHOR_API_URL not specified. Using mock API implementation."
  );
}

const converter = new Convert(
  new SchemaValidator(new ValidationApi(process.env.EQ_SCHEMA_VALIDATOR_URL))
);

const GraphQLApi = getGraphQLApi();

const app = express();
app.use(pino());

if (process.env.NODE_ENV === "development") {
  app.get("/graphql/:questionnaireId", fetchData(GraphQLApi), respondWithData);
}

app.get(
  "/publish/:questionnaireId",
  fetchData(GraphQLApi),
  schemaConverter(converter),
  respondWithData
);

app.get("/status", status);
app.get("/favicon.ico", noContent);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port", PORT); // eslint-disable-line
});
