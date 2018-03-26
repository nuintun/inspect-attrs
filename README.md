# inspect-attrs

> An object attributes inspect tool.
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![Linux Status][travis-image]][travis-url]
> [![Windows Status][appveyor-image]][appveyor-url]
> [![Test Coverage][coveralls-image]][coveralls-url]
> ![Node Version][node-image]
> [![Dependencies][david-image]][david-url]

# API

> `inspectAttrs(source: Object, rules: Object)`
>
> * `source`: The target object
> * `rules`: The inspect rules
>   * `required`: `Boolean` Set attr is required
>   * `type`: `String|Array` Set attr type
>   * `default`: `Any` Set attr default value
>   * `onRequired`: `String` Set custom required error message, `%s` equal the attr
>   * `onTypeError`: `String` Set custom type error message, `%s` equal the attr

# Example

```js
import inspectAttrs from 'inspect-attrs';

let options = {};

options = inspectAttrs(options, {
  root: {
    type: String,
    required: true
  },
  'css.loader': {
    default: null,
    type: [Function, null]
  }
});
```

[travis-image]: http://img.shields.io/travis/nuintun/inspect-attrs.svg?style=flat-square&label=linux
[travis-url]: https://travis-ci.org/nuintun/inspect-attrs
[npm-image]: https://img.shields.io/npm/v/inspect-attrs.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/inspect-attrs
[download-image]: https://img.shields.io/npm/dm/inspect-attrs.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/nuintun/inspect-attrs/master.svg?style=flat-square&label=windows
[appveyor-url]: https://ci.appveyor.com/project/nuintun/inspect-attrs
[coveralls-image]: http://img.shields.io/coveralls/nuintun/inspect-attrs/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/nuintun/inspect-attrs?branch=master
[david-image]: https://img.shields.io/david/dev/nuintun/inspect-attrs/master.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/inspect-attrs?type=dev
[node-image]: https://img.shields.io/node/v/inspect-attrs.svg?style=flat-square
