import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './App.css';

function App() {
  const [count, setCount] = useState(0)
  // 1
  // useEffect(() => {
  //   console.log('组件挂载完成之后执行，组件更新完成之后执行。')
  // })

  // 2
  // useEffect(() => {
  //   console.log('组件挂载完成之后执行')
  // }, [])

  // 3
  useEffect(() => {
    return () => {
      console.log('组件被卸载之前执行')
    }
  }, [])



  return (
    <div className="App">
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>

      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  );
}

export default App;
