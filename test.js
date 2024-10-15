const request = require('supertest');
const { app, startServer, closeServer } = require('./index.js');

describe('API Tests', function() {

    describe('GET /', function() {
        it('respond with hello world', function(done) {
            request(app).get('/').expect('{ "response": "Hello World!!" }', done);
        });
    });

    describe('GET /authors', function() {
        it('respond with authors', function(done) {
            request(app).get('/authors').expect('{ "response": " - N.Siddarthan & Shafeeq Ahamed S" }', done);
        });
    });

    describe('GET /greetings', function() {
        it('respond with greetings', function(done) {
            request(app).get('/greetings').expect('{ "response": "Welcome, all" }', done);
        });
    });

    describe('GET /ready', function() {
        it('respond with ready message', function(done) {
            request(app).get('/ready').expect('{ "response": " Great!, It works!" }', done);
        });
    });

    after(function(done) {
        closeServer(done);
    });

    this.timeout(5000);
});
