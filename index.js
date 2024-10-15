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
    server = app.listen(process.env.PORT, callback);
}

function closeServer(callback) {
    if (server) {
        server.close((err) => {
            if (err) {
                console.error('Error closing server:', err);
            }
            callback(err); // Ensure the callback is called
        });
    } else {
        callback(); // Call the callback immediately if the server is not running
    }
}


console.log('Server is running on port', 3000);


module.exports = { app, startServer, closeServer };
