/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index');

chai.should();
chai.use(chaiHttp);

describe('Mortgage Calculator API', () => {
  describe('Test GET route /api/v1/calculate/1/1/1/1/1', () => {
    it('It should return a HTTP status of 400.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/1/1/1/1/1')
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });

    it('It should return a message array.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/1/1/1/1/1')
        .end((err, response) => {
          response.body.message.should.be.an.instanceof(Array);
        });
      done();
    });

    it('It should have a message array of length 4.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/1/1/1/1/1')
        .end((err, response) => {
          response.body.message.should.have.lengthOf(4);
        });
      done();
    });
  });

  describe('Test GET route /api/v1/calculate/100000/10000/5/30/monthly', () => {
    it('It should return a HTTP status of 200.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/30/monthly')
        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });

    it('It should return a message array.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/30/monthly')
        .end((err, response) => {
          response.body = JSON.parse(response.text);
          response.body.message.should.be.an.instanceof(Array);
        });
      done();
    });

    it('It should have a message array of length 360.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/30/monthly')
        .end((err, response) => {
          response.body = JSON.parse(response.text);
          response.body.message.should.have.lengthOf(360);
        });
      done();
    });
  });

  describe('Test GET route /api/v1/calculate/100000/10000/5/1/monthly', () => {
    it('It should return a HTTP status of 400.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/1/monthly')
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });

    it('It should return a message array', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/1/monthly')
        .end((err, response) => {
          response.body.message.should.be.an.instanceof(Array);
        });
      done();
    });

    it('It should have a message array of length 2.', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/1/monthly')
        .end((err, response) => {
          response.body.message.should.have.lengthOf(2);
        });
      done();
    });

    it('It should return message reading "amortPeriod must be greater than or equal to 5" & "amortPeriod must be an increment of 5".', (done) => {
      chai.request(server)
        .get('/api/v1/calculate/100000/10000/5/1/monthly')
        .end((err, response) => {
          response.body.message.should.eql(['amortPeriod must be greater than or equal to 5', 'amortPeriod must be an increment of 5']);
        });
      done();
    });
  });
});
