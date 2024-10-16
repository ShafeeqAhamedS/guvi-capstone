var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Hello World!!" }');
});

app.get('/authors', function (req, res) {
    res.send('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }');
});

app.get('/greetings', function (req, res) {
    res.send('{ "response": ", all" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

app.get('/new', function (req, res) {
    res.send('{ "response": " New API Endpoint!" }');
});

let server;

function startServer(callback) {
    // Ensure that the server listens on the specified port
    server = app.listen(process.env.PORT || 3000, callback);
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

// Start the server only if this module is being run directly
if (require.main === module) {
    const port = process.env.PORT || 3000;
    server = app.listen(port, () => {
        console.log(`Server started running at http://localhost:${port}/`);
    });
}

module.exports = { app, startServer, closeServer };
