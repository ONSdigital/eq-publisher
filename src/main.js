const express = require('express');
const app = express();

const GraphQLApi = require('./api/MockGraphQLApi');
const Convert = require('./process/Convert');
const SchemaHelper = require('./schema/SchemaHelper')
const EQ_JSON_SCHEMA = require('../data/schema_v1.json');
const PORT = 9000;

const schemaHelper = new SchemaHelper(EQ_JSON_SCHEMA);
const schemaGenerator = SchemaGenerator(schemaHelper);
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