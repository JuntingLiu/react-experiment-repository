import React, { useRef } from 'react'

import './App.css';

function App() {
  const boxElement = useRef()

  return (
    <div ref={boxElement} className="App">
      <button onClick={() => console.log(boxElement) }>获取 DIV</button>
    </div>
  );
}

export default App;