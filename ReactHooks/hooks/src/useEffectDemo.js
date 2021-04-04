import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './App.css';

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        msg: '请求成功'
      })
    }, 1000);
  })
}

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
  // useEffect(() => {
  //   return () => {
  //     console.log('组件被卸载之前执行')
  //   }
  // }, [])

  function onScroll () {
    console.log('页面发生滚动了');
  }

  // 1、为 window 加入滚动事件
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      console.log('组件被卸载之前，取消监听 scroll')
    }
  }, [])

  // 2、定时器
  useEffect(() => {
    const timeId = setInterval(() => {
      setCount(() => {
        document.title = count
        return count + 1
      })
    }, 1000);
    return () => {
      clearInterval(timeId)
      console.log('组件被卸载之前, 定时器清空')
    }
  }, [count])

  // 3、异步函数
  useEffect(() => {
    (async () => {
      const result = await getData()
      console.log(result);
    })()
  }, [])

  return (
    <div className="App" style={{ height: 'calc(100vh * 3)' }}>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>

      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  );
}

export default App;
