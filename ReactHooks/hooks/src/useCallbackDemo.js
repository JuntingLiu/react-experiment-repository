import React, { useState, memo, useCallback } from 'react'

import './App.css';

function App() {
  const [count, setCount] = useState(0)
  // 组件重新渲染时, 保持函数实例不变
  const resetCount = useCallback(
    () => setCount(0),
    [setCount]
  )

  return (
    <div className="App" style={{ height: 'calc(100vh * 3)' }}>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Foo resetCount={resetCount}/>
    </div>
  );
}

// 通过 memo 方法防止组件进行无意义重新渲染
// Foo 数据本身没有变化，但是 App 中 count 值变化时，组件重新渲染，每次传递的 resetCount 也会重新生成不同的实例，导致 Foo 组件接收到的参数每次都会变化，也就导致 Foo 组件又会重新渲染。
const Foo = memo(function Foo (props) {
  console.log('Foo 组件重新渲染了。');
  return (
    <div>Foo 组件
      <button onClick={props.resetCount}>resetCount</button>
    </div>
  )
})

export default App;