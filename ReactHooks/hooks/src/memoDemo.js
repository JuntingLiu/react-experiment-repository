import React, { useState, memo } from 'react'

import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{ height: 'calc(100vh * 3)' }}>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Foo />
    </div>
  );
}

// 通过 memo 方法防止组件进行无意义重新渲染
const Foo = memo(function Foo () {
  console.log('Foo 组件重新渲染了。');
  return <div>Foo 组件</div>
})

export default App;
