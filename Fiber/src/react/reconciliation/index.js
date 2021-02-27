import { CreateTaskQueue, arrified, createStateNode, getTag } from '../Misc'


// 任务队列
const taskQueue = CreateTaskQueue()
// 要执行的子任务
let subTask = null
// 等待并提交
let pendingCommit = null

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    if (item.effectTag === 'placement') {
      let fiber = item
      let parentFiber = item.parent

      while(
        parentFiber.tag === 'class_component' ||
        parentFiber.tag === 'function_component'
      ) {
        parentFiber = parentFiber.parent
      }

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(item.stateNode)
      }
    }
  })
}

const getFirstTask = () => {
  // 从任务队列中获取任务（Virtual DOM）
  const task = taskQueue.pop()
  // 返回最外层节点的 fiber 对象（构建 fiber 对象）
  return {
    props: task.props,
    stateNode: task.dom, // 最外层节点 DOM 对象
    tag: "host_root", // 节点标记区分类型
    effects: [],
    child: null
  }
}

const reconcileChildren = (fiber, children) => {
  // children 可能是对象也可能是数组，将其统一返回数组
  const arrifiedChildren = arrified(children)

  let index = 0 // 循环终止条件
  let numberOfElements = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null // 上一个节点

  // 递归子节点
  while(index < numberOfElements) {
    element = arrifiedChildren[index]
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: "placement", // 类型标示，表示操作
      parent: fiber
    }

    // stateNode 属性值取决与节点的类型，存在多种情况
    newFiber.stateNode = createStateNode(newFiber)

    // 判断是否第一个子节点;
    if (index === 0) {
      // 设置父级节点的第一个子节点
      fiber.child = newFiber
    } else {
      // 对于不是第一个子节点，就让后续的子节点成为第一个子节点的兄弟节点属性上
      prevFiber.sibling = newFiber
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = fiber => {
  // 构建子节点
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }
  // 有子级返回子,使任务进行时都是从最底层子级开始倒序进行
  if (fiber.child) {
    return fiber.child
  }

  // 当前执行的 fiber
  let currentlyExecutedFiber = fiber

  // 如果存在同级返回同级, 构建同级的子级，
  // 如果同级不存在，返回到父级，看父级是否有同级
  // 收集机制，倒序收集, 从左侧最后一个节点开始收集
  while(currentlyExecutedFiber.parent) {
    // 汇总所有节点 fiber 对象到最外层 effects 数组里(逐层收集)
    currentlyExecutedFiber.parent.effects = currentlyExecutedFiber.parent.effects.concat(currentlyExecutedFiber.effects.concat(currentlyExecutedFiber))
    if (currentlyExecutedFiber.sibling) {
      return currentlyExecutedFiber.sibling
    }
    currentlyExecutedFiber = currentlyExecutedFiber.parent
  }
  pendingCommit = currentlyExecutedFiber
}

const workLoop = (deadline) => {
  // 如果子任务不存在，就去获取任务
  if (!subTask) {
    subTask = getFirstTask()
  }

  // 任务存在并且浏览器有空闲时间就调用
  // executeTask 方法执行接收的任务，并返回新任务
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
  }

  if(pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

// 任务调度逻辑
const performTask = (deadline) => {
  // 执行任务
  workLoop(deadline)

  // 判断任务是否存在
  // 判断任务队列中是否还有任务没有执行
  // 任务存在，再次告诉浏览器在空闲时间执行任务
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时间执行任务
   */

  // 任务就是通过 vdom 对象构建的 fiber 对象(element => vdom)
  taskQueue.push({
    dom, // 父级元素
    props: { children: element }
  })

  // 指定浏览器在空闲时间执行任务
  requestIdleCallback(performTask)
}
