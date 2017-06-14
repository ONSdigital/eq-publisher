const express = require('express');
const app = express();

const GraphQLApi = require('./api/MockGraphQLApi');
const GraphQLEqConverter = require('./transform/GraphQLEqConverter');
const SchemaParser = require('./schema/SchemaParser')
const EQ_JSON_SCHEMA = require('../data/schema_v1.json');
const PORT = 9000;

const schemaParser = new SchemaParser(EQ_JSON_SCHEMA);
const transformer = new GraphQLEqConverter(schemaParser);

app.get('/mock/graphql/:questionnaireId(\\d+)', (req, res) => {
    res.send(GraphQLApi.getAuthorData(req.params.questionnaireId));
});

app.get('/mock/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(transformer.convert(GraphQLApi.getAuthorData(req.params.questionnaireId)));
});

app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});