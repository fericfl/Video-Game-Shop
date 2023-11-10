import { useState } from 'react'
import NavigationBar from './NavigationBar'
import HomePage from './HomePage'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom' 
import ShoppingCart from './ShoppingCart'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'

function App() {
  return (
    <Router>
      <div className = "App">
        <NavigationBar/>
        <div className = "content" >
          <Switch>
            <Route path = "/shopping-cart">
              <ShoppingCart/>
            </Route>
            <Route path = "/login">
              <Login/>
            </Route>
            <Route path = "/signup">
              <Signup/>
            </Route>
            <Route path = "/profile">
              <Profile/>
            </Route>
            <Route path="/">
              <HomePage/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
