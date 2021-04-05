import React, { useState, useEffect, useRef } from 'react'

import './App.css';

function App() {
  const [count, setCount] = useState(0)
  // 数据变更导致组件重新渲染，timerId 每次都会被重置
  // let timerId = null
  let timerId = useRef() // 通过 useRef 来保存数据

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
    return () => {
      clearInterval(timerId)
    }
  }, [])

  const stopCount = () => {
    console.log(timerId);
    clearInterval(timerId.current)
  }

  return (
    <div className="App">
      {count}
      <button onClick={stopCount}>停止</button>
    </div>
  );
}

export default App;