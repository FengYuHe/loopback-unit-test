const s = require('./support');
const should = require('chai').should();
const sinon = require('sinon');
const rewire = require("rewire");
const myFoo = rewire('../server/models/foo');

describe('Foo', () => {
  it('create foo success', async () => {
    const spy = sinon.spy(s.app.models.Foo, 'createFoo');
    const result = await s.app.models.Foo.createFoo('test');
    sinon.assert.calledOnce(spy); // 调用一次
    sinon.assert.callCount(spy, 1); // 调用次数
    sinon.assert.calledWith(spy, 'test'); // 调用参数
    result.name.should.equal('m_test');
    spy.restore();
  });

  it('create foo fail', async () => {
    const spy = sinon.spy(s.app.models.Foo, 'createFoo');
    const create = sinon.stub(s.app.models.Foo, 'create');
    create.throws(0);
    try {
      await s.app.models.Foo.createFoo('test');
    } catch (err) {}
    spy.threw().should.be.true;
    spy.restore();
  });

  it('test format function', done => {
    const func = myFoo.__get__('format');
    func('abc').should.equal('m_abc');
    done();
  });

  it('test sum', done => {
    s.app.sum(1, 2).should.equal(3);
    done();
  });
});
