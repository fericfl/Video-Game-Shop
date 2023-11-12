import { useState } from 'react'
import NavigationBar from './NavigationBar'
import HomePage from './HomePage'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom' 
import ShoppingCart from './ShoppingCart'
import AddProduct from './functions/AddProduct'
import ProductList from './functions/ProductList'
import SpecificProductPage from './SpecificProductPage'
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
            <Route path = "/add-product">
              <AddProduct/>
            </Route>
            <Route exact path = "/games-action">
              <ProductList category = {'Action'}/>
            </Route>
            <Route exact path = "/games-shooter">
              <ProductList category = {'Shooter'}/>
            </Route> 
            <Route exact path = "/games-story">
              <ProductList category = {'Story'}/>
            </Route>
            <Route exact path = "/games-simulation">
              <ProductList category = {'Simulation'}/>
            </Route>
            <Route exact path = "/games-adventure">
              <ProductList category = {'Adventure'}/>
            </Route>
            <Route exact path = "/games-racing">
              <ProductList category = {'Racing'}/>
            </Route>
            <Route exact path = "/games-puzzle">
              <ProductList category = {'Puzzle'}/>
            </Route>
            <Route path = "/games/:id">
              <SpecificProductPage/>
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
