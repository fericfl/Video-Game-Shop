import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt, QuerySnapshot} from 'firebase/firestore';
import {db} from "./functions/firebase"; 

import GetCurrentUser from "./functions/GetCurrentUser";
const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
  
    const loggeduser = GetCurrentUser();
    const [cartData, setCartData] = useState([]);
    if(loggeduser){
      const getCartData = async () => {
        const cartArray = [];
        const path = `cart-${loggeduser[0].uid}`;
        getDocs(collection(db, path), then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({...doc.data(), id:doc.id})
          });
          setCartData(cartArray);
        }))
      }
    }
    return (
      <div className="shoppingCart">
        {cartData ? <div> 
            <div>
              Your cart is not empty
            </div> 
          </div> : <p>
          Your cart is empty
          </p>}
      </div>
    );
  };

  export default ShoppingCart;