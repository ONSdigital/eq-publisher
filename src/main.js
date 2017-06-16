const express = require('express');
const app = express();

const GraphQLApi = require('./api/MockGraphQLApi');
const Convert = require('./process/Convert');
const SchemaGenerator = require('./schema/SchemaGenerator');
const EQ_JSON_SCHEMA = require('../data/schema_v1.json');
const PORT = 9000;

const schemaGenerator = new SchemaGenerator(EQ_JSON_SCHEMA);
const converter = new Convert(schemaGenerator);

app.get('/mock/graphql/:questionnaireId(\\d+)', (req, res) => {
    res.send(GraphQLApi.getAuthorData(req.params.questionnaireId));
});

app.get('/mock/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(converter.convert(GraphQLApi.getAuthorData(req.params.questionnaireId)));
});

app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});