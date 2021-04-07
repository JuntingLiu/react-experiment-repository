import React from 'react'
import ReactDOM from 'react-dom'
// import { Link, Route } from 'react-router-dom'

// import Home from './pages/Home'
// import List from './pages/List'
import './App.css';


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')

  useEffect(() => {
    console.log('useEffect change - count');
  }, [count]);
  useEffect(() => {
    console.log('useEffect change - name');
  }, [name]);

  return (
    <div className="App">
      <div>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+1</button>
        {name}
        <button onClick={() => setName('李四')}>change name</button>
      </div>
      </div>
    </div>
  );
}

export default App;

let prevDepsAry = [] // 上一次依赖值
let effectIndex = 0;

function useEffect(callback, depsAry) {
  // 判断 callback 是不是函数
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error ('useEffect 函数的第一个参数必须是函数')
  }
  // 判断 depsAry 是否传递
  if (typeof depsAry === 'undefined') {
    // 没有传递，直接调用 callback
    callback()
  } else {
    // 判断 depsAry 是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') {
      throw new Error('useEffect 的第二个参数必须是一个数组')
    }
    // 获取上一次依赖值
    let prevDeps = prevDepsAry[effectIndex]
    // 将当前的依赖值和上一次依赖值做对比，如果有变化调用 callback
    let hasChanged = prevDeps ? depsAry.every((dep, index) => dep === prevDeps[index]) === false : true
    // 判断值是否有变化
    if (hasChanged) {
      callback()
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry
    effectIndex++
  }
}

// 确保 useState 可以被调用任意次
let state = [];
let setters = [];
let stateIndex = 0;

function createSetter(index) {
  return function (newState) {
    state[index] = newState
    render()
  }
}

function useState (initialState) {
  // state = state ? state : initialState
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))

  let value = state[stateIndex]
  let setter = setters[stateIndex]

  stateIndex++;
  return [value, setter]
}

function render () {
  // 保证 stateIndex 正确性
  stateIndex = 0;
  effectIndex = 0;
  ReactDOM.render(<App />, document.getElementById('root'))
}