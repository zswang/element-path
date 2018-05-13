/* istanbul ignore next */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (root, factory) {
    /* istanbul ignore next */
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    } else {
        var temp = {};
        factory(null, temp);
        root["ElementPath"] = temp.ElementPath;
    }
})(this, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @file element-path
     *
     * Path of element get and query.
     * @author
     *   zswang (http://weibo.com/zswang)
     * @version 0.0.25
     * @date 2018-05-13
     */
    /*<function name="ElementPath">*/
    var ElementPath = /** @class */ (function () {
        function ElementPath(options) {
            this.options = __assign({ tags: {}, splitter: '-' }, options);
            if (typeof this.options.tags === 'string') {
                this.options.tags = this.options.tags
                    .trim()
                    .split(/[\s,]+/)
                    .reduce(function (tags, tagName, index) {
                    var char = String.fromCharCode(65 /* A */ + index);
                    tags[tagName] = char;
                    tags[char] = tagName;
                    return tags;
                }, {});
            }
        }
        /**
         * 获取元素的路径
         * @param node 元素
         * @example get():base
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath()
           console.log(ep.get(document.querySelector('.li1')))
           // > div-ul-li
           console.log(ep.get(document.querySelector('.li2')))
           // > div-ul-li2
           console.log(ep.get(document.querySelector('.li3')))
           // > div-ul-li3
           console.log(JSON.stringify(ep.get(null)))
           // > ""
           console.log(ep.get(document.body))
           // > body
           console.log(ep.get(document.documentElement))
           // > html
           console.log(ep.get(document.querySelector('.li1').firstChild))
           // > div-ul-li
           ```
         * @example get():splitter
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath({ splitter: '/' })
           console.log(ep.get(document.querySelector('.li1')))
           // > div/ul/li
           console.log(ep.get(document.querySelector('.li2')))
           // > div/ul/li2
           console.log(ep.get(document.querySelector('.li3')))
           // > div/ul/li3
           ```
         * @example get():short
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
              <li class="li4"><i>4</i></li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath({ tags: 'div,ul,li' })
           console.log(ep.get(document.querySelector('.li1')))
           // > ABC
           console.log(ep.get(document.querySelector('.li2')))
           // > ABC2
           console.log(ep.get(document.querySelector('.li3')))
           // > ABC3
           console.log(ep.get(document.querySelector('.li4 i')))
           // > ABC4i
           ```
         */
        ElementPath.prototype.get = function (node) {
            if (!node)
                return '';
            if (node === document.documentElement)
                return 'html';
            if (node === document.body)
                return 'body';
            var result = '';
            if (node.parentNode && node.parentNode !== document.body) {
                result = this.get(node.parentNode);
            }
            var count = 1;
            if (node.previousSibling) {
                var sibling = node.previousSibling;
                do {
                    if (sibling.nodeType === 1 /* Node.ELEMENT_NODE */ &&
                        sibling.nodeName == node.nodeName) {
                        count++;
                    }
                    sibling = sibling.previousSibling;
                } while (sibling);
            }
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                var nodeName = node.nodeName.toLowerCase();
                var short = this.options.tags[nodeName];
                result += "" + (short
                    ? short
                    : (/[a-z]$/.test(result) ? this.options.splitter : '') + nodeName) + (count === 1 ? '' : count);
            }
            return result;
        };
        /**
         * 查询路径对应的元素
         * @param node 元素
         * @example query():base
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath()
           console.log(ep.query('div-ul-li') === document.querySelector('.li1'))
           // > true
           console.log(ep.query('div-ul-li2') === document.querySelector('.li2'))
           // > true
           console.log(ep.query('div-ul-li3') === document.querySelector('.li3'))
           // > true
           console.log(ep.query(null))
           // > null
           console.log(ep.query('body') === document.body)
           // > true
           console.log(ep.query('html') === document.documentElement)
           // > true
           ```
         * @example get():splitter
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath({ splitter: '/' })
           console.log(ep.query('div/ul/li') === document.querySelector('.li1'))
           // > true
           console.log(ep.query('div/ul/li1') === document.querySelector('.li1'))
           // > true
           console.log(ep.query('div/ul/li2') === document.querySelector('.li2'))
           // > true
           console.log(ep.query('div/ul/li3') === document.querySelector('.li3'))
           // > true
           console.log(ep.query('div/ul/li4'))
           // > null
           console.log(ep.query('div/ul/li4/i'))
           // > null
           ```
         * @example get():short
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
              <li class="li4"><i>4</i></li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath({ tags: 'div,ul,li' })
           console.log(ep.query('ABC') === document.querySelector('.li1'))
           // > true
           console.log(ep.query('ABC2') === document.querySelector('.li2'))
           // > true
           console.log(ep.query('ABC3') === document.querySelector('.li3'))
           // > true
           console.log(ep.query('ABC4i') === document.querySelector('.li4 i'))
           // > true
           ```
         */
        ElementPath.prototype.query = function (path) {
            var _this = this;
            if (path === null) {
                return null;
            }
            var result = document.body;
            if (!path || path === 'body')
                return result;
            if (path === 'html')
                return document.documentElement;
            path.replace(/([A-Z]|h[1-6]|[a-z]+)(\d*)/g, function (all, tag, count) {
                if (!result)
                    return '';
                count = count || 1;
                var nodes = result.getElementsByTagName(/[A-Z]/.test(tag) ? _this.options.tags[tag] : tag);
                for (var i = 0, l = nodes.length; i < l; i++) {
                    var node = nodes[i];
                    if (node.parentNode === result && !--count) {
                        result = node;
                        break;
                    }
                }
                if (count)
                    result = null;
            });
            return result;
        };
        return ElementPath;
    }()); /*</function>*/
    exports.ElementPath = ElementPath;
});
