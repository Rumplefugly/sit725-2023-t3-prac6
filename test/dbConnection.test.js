// /dbConnection.js testing using mocha/chai

const chai = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { client, runDBConnection } = require('../dbConnection');

const { expect } = chai;


describe('Testing MongoDB Connection\n', () => {
  let connectStub;

  beforeEach(() => {
    connectStub = sinon.stub(MongoClient.prototype, 'connect');
  });

  afterEach(() => {
    connectStub.restore();
  });

  it('Testing successful connection to the database\n', async () => {
    connectStub.resolves();

    await runDBConnection();

    expect(connectStub.calledOnce).to.be.true;
  });

  it('Testing failed connection to database and subsequent error handling\n', async () => {
    const error = new Error('Connection failed');
    connectStub.rejects(error);

    try {
      await runDBConnection();
    } catch (ex) {
      expect(ex).to.equal(error);
    }

    expect(connectStub.calledOnce).to.be.true;
  });
});

// 2 tests passing