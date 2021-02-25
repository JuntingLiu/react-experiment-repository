// 任务队列
const createTaskQueue = (item) => {
  const taskQueue = []
  return {
    // 向任务队列添加任务
    push: item => taskQueue.push(item),
    // 向任务队列取出任务
    pop: () => taskQueue.shift(),
    // 判断任务队列是否为空
    isEmpty: () => taskQueue.length === 0
  }
}

export default createTaskQueue