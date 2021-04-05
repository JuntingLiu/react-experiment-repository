import React from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './pages/Home'
import List from './pages/List'
import './App.css';


function App() {

  return (
    <div className="App">
      <div>
        <Link to="/home">首页</Link>
        <Link to="/list">列表</Link>
      </div>
      <div>
        <Route path="/home/:name" component={Home} />
        <Route path="/list" component={List} />
      </div>
    </div>
  );
}

export default App;