import React, { useState } from 'react'

import './App.css';

// 表单元素的每个表单项都需要添加 value 和 onChange 的属性，将这个公共提取出来
function useUpdateInput (initialValue) {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    onChange: event => setValue(event.target.value)
  }
}

function App() {
  const usernameInput = useUpdateInput('')
  const passwordInput = useUpdateInput('')

  const submitForm = (event) => {
    event.preventDefault();

    console.log(usernameInput.value);
    console.log(passwordInput.value);
  }

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <input type="text" name="username" {...usernameInput }/>
        <input type="password" name="password" {...passwordInput }/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default App;