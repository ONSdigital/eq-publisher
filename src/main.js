const express = require('express');
const app = express();

const GraphQLApi = require('./api/MockGraphQLApi');
const GraphQLEqTransformer = require('./transform/GraphQLEqTransformer');
const SchemaParser = require('./transform/SchemaParser')
const EQ_JSON_SCHEMA = require('../data/schema_v1.json');
const PORT = 9000;

const schemaParser = new SchemaParser(EQ_JSON_SCHEMA);
const transformer = new GraphQLEqTransformer(schemaParser);

app.get('/mock/graphql/:questionnaireId(\\d+)', (req, res) => {
    res.send(GraphQLApi.getAuthorData(req.params.questionnaireId));
});

app.get('/mock/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(transformer.transform(GraphQLApi.getAuthorData(req.params.questionnaireId)));
});

app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});