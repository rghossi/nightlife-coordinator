process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server');

describe('routes : users', () => {

  beforeEach((done) => {
    
  });

  afterEach((done) => {
    
  });

});