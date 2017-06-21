const express = require('express');
const app = express();

const GraphQLApi = require('./api/MockGraphQLApi');
const Convert = require('./process/Convert');
const SchemaValidator = require('./validation/SchemaValidator');
const EQ_JSON_SCHEMA = require('../data/schema_v1.json');
const PORT = 9000;

const schemaValidator = new SchemaValidator(EQ_JSON_SCHEMA);
const converter = new Convert(schemaValidator);

app.get('/mock/graphql/:questionnaireId(\\d+)', async (req, res, next) => {
    try {
        const result = await GraphQLApi.getAuthorData(req.params['questionnaireId']);
        if(result.data.questionnaire === null) {
            return next();
        }
        res.json(result);
    }
    catch(err) {
        next(err);
    }
});

app.get('/mock/publish/:questionnaireId(\\d+)', async (req, res, next) => {
    try {
        const result = await GraphQLApi.getAuthorData(req.params['questionnaireId']);
        if(result.data.questionnaire === null) {
            return next();
        }
        res.json(converter.convert(result.data));
    }
    catch(err) {
        next(err);
    }
});

app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});

function errorHandler (err, req, res) {
    res.status(500)
    res.render('error', { error: err })
}