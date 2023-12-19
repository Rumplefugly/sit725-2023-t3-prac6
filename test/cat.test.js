// /models/cat.js testing using mocha/chai

const chai = require('chai');
const sinon = require('sinon');
const { initializeCollection, getAllCats, postCat } = require('../models/cat');
const { runDBConnection } = require('../dbConnection');

const { expect } = chai;

describe('Cat', () => {
  let findStub, toArrayStub, insertOneStub, runDBConnectionStub;

  beforeEach(() => {
    findStub = sinon.stub().returnsThis();
    toArrayStub = sinon.stub();
    insertOneStub = sinon.stub();
    runDBConnectionStub = sinon.stub(runDBConnection, 'runDBConnection');

    runDBConnectionStub.resolves({
      find: findStub,
      insertOne: insertOneStub
    });
  });

  afterEach(() => {
    runDBConnectionStub.restore();
  });

  it('should get all cats', async () => {
    const cats = [{ name: 'cat1' }, { name: 'cat2' }];
    toArrayStub.resolves(cats);

    await initializeCollection();
    const result = await getAllCats();

    expect(findStub.calledOnce).to.be.true;
    expect(toArrayStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(cats);
  });

  it('should post a cat', async () => {
    const cat = { name: 'cat1' };
    const expected = { result: { ok: 1 } };
    insertOneStub.resolves(expected);

    await initializeCollection();
    const result = await postCat(cat);

    expect(insertOneStub.calledOnceWith(cat)).to.be.true;
    expect(result).to.deep.equal(expected);
  });
});