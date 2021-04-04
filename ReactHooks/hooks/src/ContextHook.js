import React, { createContext, useContext } from 'react'

const countContext = createContext();

function Header () {
  const value = useContext(countContext)
  return (
    <div>
      Header!
      <p>{value}</p>
    </div>
  )
}

function Footer () {
  const value = useContext(countContext)
  return (
    <div>
      Footer!
      <p>{value}</p>
    </div>
  )
}

function ContextHook () {
  return <countContext.Provider value={666} >
    <Header />
    <Footer />
  </countContext.Provider>
}

export default ContextHook