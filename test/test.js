/**
 * @module test
 * @license MIT
 * @version 2018/03/26
 */

const expect = require('chai').expect;
const inspectAttrs = require('../index');

const typpy = inspectAttrs.typpy;

describe('inspect attrs', () => {
  it('should export typpy', () => {
    expect(typpy).to.be.a('function');

    typpy(NaN);
    typpy(NaN, NaN);
    typpy(NaN, 'nan');
    typpy(null);
    typpy(null, null);
    typpy(null, 'null');
    typpy(undefined);
    typpy(undefined, undefined);
    typpy(undefined, 'undefined');
  });

  it('should export typpy.typeof', () => {
    expect(typpy.typeof).to.be.a('function');

    typpy.typeof(NaN);
    typpy.typeof(NaN, true);
    typpy.typeof(null);
    typpy.typeof(null, true);
    typpy.typeof(undefined);
    typpy.typeof(undefined, true);
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
      {
        key: { type: String, default: 'key' },
        'sub.key': { type: [String], default: 'key' }
      }
    );

    expect(object).to.be.eql({ key: 'key', sub: { key: 'key' } });
  });

  it('should throw error on type invalid and no default value', () => {
    const fn = () => inspectAttrs({ key: () => 'key' }, { key: { type: String } });

    expect(fn).to.throw(TypeError, 'Attr key is invalid!');
  });
});
