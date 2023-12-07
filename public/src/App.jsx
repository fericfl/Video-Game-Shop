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
import OrderDetails from './OrderDetails'
import AllGames from './AllGames'

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
            <Route path = "/category/">
              <ProductList/>
            </Route>
            <Route exact path = "/games">
              <AllGames></AllGames>
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
            <Route path="/order-details/:orderId" component={OrderDetails} />
            <Route path="/order-history/:userId" component={OrderHistory} />
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
