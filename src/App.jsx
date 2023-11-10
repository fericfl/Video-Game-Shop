import { useState } from 'react'
import NavigationBar from './NavigationBar'
import HomePage from './HomePage'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom' 
import ShoppingCart from './ShoppingCart'
import AddProduct from './functions/AddProduct'
import ProductList from './functions/ProductList'

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
              <ProductList category = {'action'}/>
            </Route>
            <Route exact path = "/games-shooter">
              <ProductList category = {'shooter'}/>
            </Route> 
            <Route exact path = "/games-story">
              <ProductList category = {'story'}/>
            </Route>
            <Route exact path = "/games-simulation">
              <ProductList category = {'simulation'}/>
            </Route>
            <Route exact path = "/games-adventure">
              <ProductList category = {'adventure'}/>
            </Route>
            <Route exact path = "/games-racing">
              <ProductList category = {'racing'}/>
            </Route>
            <Route exact path = "/games-puzzle">
              <ProductList category = {'puzzle'}/>
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
