import React from 'react'
import { useHistory, useLocation, useRouteMatch, useParams }  from 'react-router-dom'

function Home (props) {
  console.log(props);
  console.log(useHistory());
  console.log(useLocation());
  console.log(useRouteMatch());
  console.log(useParams());
  return (
    <div>
      <h1>Home 主页</h1>
    </div>
  )
}

export default Home