/**
 * @module test
 * @license MIT
 * @version 2018/03/26
 */

const expect = require('chai').expect;
const inspectAttrs = require('../dist/index');

describe('inspect attrs', () => {
  it('should export typpy', () => {
    expect(inspectAttrs.typpy).to.be.a('function');
  });

  it('should export typpy.typeof', () => {
    expect(inspectAttrs.typpy.typeof).to.be.a('function');
  });

  it('should custom type error message', () => {
    const fn = () => inspectAttrs({ key: () => 'key' }, { key: { type: String, onTypeError: 'Custom %s error!' } });

    expect(fn).to.throw(TypeError, 'Custom key error!');
  });

  it('should custom required error message', () => {
    const fn = () => inspectAttrs({}, { key: { required: true, onRequired: 'Custom %s error!' } });

    expect(fn).to.throw(Error, 'Custom key error!');
  });

  it('should throw error on required missing', () => {
    const fn = () => inspectAttrs({}, { key: { required: true } });

    expect(fn).to.throw(Error, 'Attr key is required!');
  });

  it('should passed on type invalid and have default value', () => {
    const object = inspectAttrs(
      { key: () => 'key', sub: { key: () => 'key' } },
      { key: { type: String, default: 'key' }, 'sub.key': { type: [String], default: 'key' } }
    );

    expect(object).to.be.eql({ key: 'key', sub: { key: 'key' } });
  });

  it('should throw error on type invalid and no default value', () => {
    const fn = () => inspectAttrs({ key: () => 'key' }, { key: { type: String } });

    expect(fn).to.throw(TypeError, 'Attr key is invalid!');
  });
});
