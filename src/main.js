const express = require("express");
const pino = require("express-pino-logger");
const errorHandler = require("./middleware/errorHandler");
const fetchData = require("./middleware/fetchData");
const schemaConverter = require("./middleware/schemaConverter");
const respondWithData = require("./middleware/respondWithData");

const Convert = require("./process/Convert");
const createSchemaValidator = require("./validation/createSchemaValidator");
const { getGraphQLApi } = require("./api/createGraphQLApi");

const converter = new Convert(createSchemaValidator());
const GraphQLApi = getGraphQLApi();

const app = express();
app.use(pino());

app.get("/graphql/:questionnaireId", fetchData(GraphQLApi), respondWithData);

app.get(
  "/publish/:questionnaireId",
  fetchData(GraphQLApi),
  schemaConverter(converter),
  respondWithData
);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

app.listen(PORT, HOSTNAME, () => {
  console.log("Listening on port", PORT); // eslint-disable-line
});
