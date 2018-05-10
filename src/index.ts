export interface IElementPathOptions {
  tags?: { [name: string]: string } | string
}

/*<jdists encoding="ejs" data="../package.json">*/
/**
 * @file <%- name %>
 *
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% var now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
 */
/*</jdists>*/

/*<function name="ElementPath">*/
export class ElementPath {
  options: IElementPathOptions

  constructor(options: IElementPathOptions) {
    this.options = { tags: {}, ...options }
    if (typeof this.options.tags === 'string') {
      this.options.tags = this.options.tags
        .split(/[\s,]+/)
        .reduce((tags, tagName, index) => {
          let char = String.fromCharCode(65 /* A */ + index)
          tags[tagName] = char
          tags[char] = tagName
          return tags
        }, {})
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
  get(node: Node): string {
    if (node === document.documentElement) return 'html'
    if (node === document.body) return 'body'

    let result = ''
    if (node.parentNode && node.parentNode !== document.body) {
      result = this.get(node.parentNode)
    }
    let count = 1
    if (node.previousSibling) {
      let sibling = node.previousSibling
      do {
        if (sibling.nodeType === 1 && sibling.nodeName == node.nodeName) {
          count++
        }
        sibling = sibling.previousSibling
      } while (sibling)
    }
    if (node.nodeType === 1) {
      let nodeName = node.nodeName.toLowerCase()
      let short = this.options.tags[nodeName]
      result += `${short ? short : (result ? '-' : '') + nodeName}${
        count === 1 ? '' : count
      }`
    }
    return result
  }

  query(path: string): Node {
    let result = document.body
    if (!path || path === 'body') return result
    if (path === 'html') return document.documentElement
    path.replace(/([A-Z]|h[1-6]|[a-z]+)(\d*)/g, (all, tag, count) => {
      if (!result) return ''
      count = count || 1
      let nodes = result.getElementsByTagName(
        /[A-Z]/.test(tag) ? this.options.tags[tag] : tag
      )
      for (let i = 0, l = nodes.length; i < l; i++) {
        let node = nodes[i]
        if (node.parentNode === result && !--count) {
          result = node
          break
        }
      }
      if (count) result = null
    })
    return result
  }
} /*</function>*/