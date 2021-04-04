import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css';

const useGithubUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('https://api.github.com/users').then(res => {
      const { data, status } = res

      if (status === 200) {
        setUsers(data)
        console.log("🚀 ~ file: App.js ~ line 15 ~ axios.get ~ data", data)
      }
    })
  }, [])
  return [users, setUsers]
}

function App() {
  const [ users, setUsers ] = useGithubUsers()

  return (
    <div className="App">
      {
        users.map(user => (
          <p key={user.login}>
            <span>{user.login}</span> =>
            <span>{user.html_url}</span>
          </p>
        ))
      }
    </div>
  );
}

export default App;