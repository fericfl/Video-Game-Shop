import { useState } from 'react'
import NavigationBar from './NavigationBar'
import HomePage from './HomePage' 

function App() {
  return (
    <div className = "App">
      <NavigationBar/>
      <HomePage/>
      <div className = "content" >
        <h1>Hello!</h1>
      </div>
    </div>
  )
}

export default App
