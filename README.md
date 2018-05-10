# Element-Path

Path of element get and query.

## Examples

```js
var ep = new ElementPath()
var element = document.querySelect('a:nth-child(2)')
var path = ep.get(element)
console.log(element === ep.query(path))
// true
```