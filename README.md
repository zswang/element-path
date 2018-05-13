# Element-Path

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Path of element get and query.

## Examples

```js
var ep = new ElementPath()
var element = document.querySelect('a:nth-child(2)')
var path = ep.get(element)
console.log(element === ep.query(path))
// true
```

```js
var ep = new ElementPath({
  tags: 'textarea,section,div'
})
var element = document.querySelect('a:nth-child(2)')
var path = ep.get(element)
console.log(element === ep.query(path))
// true
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/element-path
[npm-image]: https://badge.fury.io/js/element-path.svg
[travis-url]: https://travis-ci.org/zswang/element-path
[travis-image]: https://travis-ci.org/zswang/element-path.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/element-path?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/element-path/badge.svg?branch=master&service=github
