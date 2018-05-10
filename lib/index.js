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
     * @version 0.0.5
     * @date 2018-05-10
     */
    /*<function name="ElementPath">*/
    var ElementPath = /** @class */ (function () {
        function ElementPath(options) {
            this.options = __assign({ tags: {} }, options);
            if (typeof this.options.tags === 'string') {
                this.options.tags = this.options.tags
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
           let element = document.querySelector('.li1')
           console.log(ep.get(element))
           ```
         */
        ElementPath.prototype.get = function (node) {
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
                    if (sibling.nodeType === 1 && sibling.nodeName == node.nodeName) {
                        count++;
                    }
                    sibling = sibling.previousSibling;
                } while (sibling);
            }
            if (node.nodeType === 1) {
                var nodeName = node.nodeName.toLowerCase();
                var short = this.options.tags[nodeName];
                result += "" + (short ? short : (result ? '-' : '') + nodeName) + (count === 1 ? '' : count);
            }
            return result;
        };
        ElementPath.prototype.query = function (path) {
            var _this = this;
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
