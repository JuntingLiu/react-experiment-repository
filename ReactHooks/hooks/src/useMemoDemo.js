import React, { useState, useMemo } from 'react'

import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [bool, setBool] = useState(false)

  const double_count = useMemo(() => {
    console.log(count);
    return count * 2
  }, [count])

  return (
    <div className="App" style={{ height: 'calc(100vh * 3)' }}>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>

      <p> 两倍 count：{double_count}</p>

      <p>{ bool ? '真' : '假' }</p>
      <button onClick={() => setBool(!bool)}>setBool</button>
    </div>
  );
}

export default App;
