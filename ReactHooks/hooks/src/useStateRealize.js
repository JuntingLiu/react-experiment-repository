import React from 'react'
import ReactDOM from 'react-dom'
// import { Link, Route } from 'react-router-dom'

// import Home from './pages/Home'
// import List from './pages/List'
import './App.css';


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')
  return (
    <div className="App">
      {/* <div>
        <Link to="/home">首页</Link>
        <Link to="/list">列表</Link>
      </div>
      <div>
        <Route path="/home/:name" component={Home} />
        <Route path="/list" component={List} />
      </div> */}
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+1</button>
        {name}
        <button onClick={() => setName('李四')}>change name</button>
      </div>
    </div>
  );
}

export default App;

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
  ReactDOM.render(<App />, document.getElementById('root'))
}