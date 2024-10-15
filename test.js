const request = require('supertest');
const { app, startServer, closeServer } = require('./index.js');

describe('API Tests', function() {
    before(function(done) {
        process.env.PORT = '3001';
        startServer(done);
    });

    describe('GET /', function() {
        it('respond with hello world', function(done) {
            request(app)
                .get('/')
                .expect('{ "response": "Hello World!!" }')
                .end(done);
        });
    });

    describe('GET /authors', function() {
        it('respond with authors', function(done) {
            request(app)
                .get('/authors')
                .expect('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }')
                .end(done);
        });
    });

    describe('GET /greetings', function() {
        it('respond with greetings', function(done) {
            request(app)
                .get('/greetings')
                .expect('{ "response": "Welcome, all" }')
                .end(done);
        });
    });

    describe('GET /ready', function() {
        it('respond with ready message', function(done) {
            request(app)
                .get('/ready')
                .expect('{ "response": " Great!, It works!" }')
                .end(done);
        });
    });

    after(function(done) {
        console.log('Closing server...');
        closeServer((err) => {
            if (err) {
                console.error('Failed to close server:', err);
            }
            console.log('Server closed.');
            done();
        });
    });

    this.timeout(5000);
});
