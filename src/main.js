const express = require('express');
const app = express();

const GraphQLApi = require('./api/mockgraphqlapi');
const EQConverter = require('./converter/converter');

const PORT = 9000;

app.get('/mock/graphql/:questionnaireId(\\d+)', (req, res) => {
    res.send(GraphQLApi.getQuestionnaire(req.params.questionnaireId));
});

app.get('/mock/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(EQConverter.convert(GraphQLApi.getQuestionnaire(req.params.questionnaireId)));
});

app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});