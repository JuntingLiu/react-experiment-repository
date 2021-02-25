/**
 * createElement 方法
 * @Author: Junting
 * @Date: 2021-02-21 11:17:03
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-25 19:43:33
 */

/**
 * 创建 Virtual DOM
 * @param {string} type type 类型
 * @param {object ｜ null} props 属性
 * @param {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
  // 针对文本节点进行额外处理
  const childElements = [].concat(...children).reduce((result, child) => {
    // 需要剔除 false、true、null 的节点（所以 map 方法改用 reduce）
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child }))
      }
    }
    return result
  }, [])

  return {
    type,
    props: Object.assign({ children: childElements, ...props })
  }
}
