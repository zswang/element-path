export interface IElementPathOptions {
    tags?: {
        [name: string]: string;
    } | string;
}
/**
 * @file element-path
 *
 * Path of element get and query.
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.4
 * @date 2018-05-10
 */
export declare class ElementPath {
    options: IElementPathOptions;
    constructor(options: IElementPathOptions);
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
    get(node: Node): string;
    query(path: string): Node;
}
