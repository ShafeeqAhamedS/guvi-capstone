var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Hello World!!" }');
});

app.get('/authors', function (req, res) {
    res.send('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }');
});

app.get('/greetings', function (req, res) {
    res.send('{ "response": "Welcome, all" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

let server;

function startServer(callback) {
    server = app.listen(process.env.PORT || 3000, callback);
}

function closeServer(callback) {
    server.close(callback);
}

startServer(() => {
    console.log('Server is running on port', process.env.PORT || 3000);
});


module.exports = { app, startServer, closeServer };
