const express = require('express');
const app = express();

const GraphQLApi = require('./api/mock-graphql-api')

const PORT = 9000;

const AUTHOR_API = '';


app.get('/', (req, res) => {
    res.send({
        key: 'value'
    })
});


app.get('/publish/:questionnaireId(\\d+)', (req, res) => {
    res.send(req.params)
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
});