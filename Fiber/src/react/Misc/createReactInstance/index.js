export const createReactInstance = fiber => {
  let instance = null
  // 区分函数组件和类组件
  if(fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props)
  } else {
    // instance =
  }
  return instance
}