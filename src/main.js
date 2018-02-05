const express = require("express");
const pino = require("express-pino-logger");
const errorHandler = require("./middleware/errorHandler");
const fetchData = require("./middleware/fetchData");
const schemaConverter = require("./middleware/schemaConverter");
const respondWithData = require("./middleware/respondWithData");
const status = require("./middleware/status");
const noContent = require("./middleware/nocontent");

const Convert = require("./process/Convert");
const createSchemaValidator = require("./validation/createSchemaValidator");
const { getGraphQLApi } = require("./api/createGraphQLApi");

const converter = new Convert(createSchemaValidator());
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
