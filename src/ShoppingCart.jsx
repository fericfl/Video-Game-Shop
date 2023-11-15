import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt, QuerySnapshot} from 'firebase/firestore';
import {db} from "./functions/firebase"; 
import CartCard from "./CartCard"
import GetCurrentUser from "./functions/GetCurrentUser";
import './functions/ShoppingCart.css'
const ShoppingCart = () => {  
    const loggeduser = GetCurrentUser();
    const [cartData, setCartData] = useState([]);
    const totalprice = 100;
    useEffect(() => {
      if(loggeduser){
          const getCartData= async () => {
              const cartArray = [];
              const path = `cart-${loggeduser[0].uid}`
              console.log(path);
              getDocs(collection(db, path)).then((QuerySnapshot) => {
                  QuerySnapshot.forEach((doc) => {
                      console.log(doc.id, "=>", doc.data());
                      cartArray.push({...doc.data(), id:doc.id})
                  })
                  setCartData(cartArray)
                  console.log(cartArray)
                  console.log('done');
              }).catch('Error error error');
          }
          getCartData();
      }}, [loggeduser]);

    return (
      <div className="shoppingCart">
        {cartData ? <div> 
          <div className='cart-head'> Your Cart Items </div>

            <div className="shopping-cart-container">
              <div className='allcartitems'>
                {cartData.map((item) => (
                  <CartCard key = {item.id} 
                            item = {item}
                            userid={loggeduser[0].uid}/>
                ))}
              </div>
              <div className="order-summary">
                <div className="order-summary-title"> Your Order Summary</div>
                <div className="total-price">
                  <div>Product total: </div>
                  <div> {totalprice} RON </div>
                </div>
                <div className="total-price">
                  <div>Delivery fee: </div>
                  <div> 15 RON </div>
                </div>
                <div className="total">
                  Total:
                </div>
                <div className="total-price-final">
                  {totalprice} RON
                </div>
                <div className="checkout-button-div"> 
                  <button className="checkout-button"> Proceed to checkout </button> 
                </div> 
                
              </div>
            </div> 
          </div> : <p>
          Your cart is empty
          </p>}
      </div>
    );
  };

  export default ShoppingCart;