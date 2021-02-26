import React, { render } from './react'

const root = document.getElementById('root');

const jsx = (
  <div>
    <p>Hello React Fiber</p>
    <p>Hello React Fiber2</p>
  </div>
)

console.log('Virtual DOM: ', jsx);

render(jsx, root)