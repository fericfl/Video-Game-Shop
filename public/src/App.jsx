import { useState } from 'react'
import NavigationBar from './NavigationBar'
import HomePage from './HomePage'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom' 
import ShoppingCart from './ShoppingCart'
import AddProduct from './functions/AddProduct'
import ProductList from './functions/ProductList'
import SpecificProductPage from './SpecificProductPage'
import EditPage from './EditPage'
import Login from './functions/Login'
import Signup from './functions/Signup'
import Profile from './Profile'
import SearchResultsPage from './SearchResultsPage'
import OrderHistory from './OrderHistory'

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
            <Route path = "/games-action">
              <ProductList category = {'Action'}/>
            </Route>
            <Route path = "/games-shooter">
              <ProductList category = {'Shooter'}/>
            </Route> 
            <Route path = "/games-story">
              <ProductList category = {'Story'}/>
            </Route>
            <Route path = "/games-simulation">
              <ProductList category = {'Simulation'}/>
            </Route>
            <Route path = "/games-adventure">
              <ProductList category = {'Adventure'}/>
            </Route>
            <Route path = "/games-racing">
              <ProductList category = {'Racing'}/>
            </Route>
            <Route path = "/games-puzzle">
              <ProductList category = {'Puzzle'}/>
            </Route>
            <Route path = "/games/:id">
              <SpecificProductPage/>
            </Route>
            <Route path = "/edit-page/:name">
              <EditPage/>
            </Route>
            <Route path = "/search-results/:search">
              <SearchResultsPage/>
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
            <Route path = "/order-history">
              <OrderHistory/>
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
