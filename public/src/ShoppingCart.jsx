import { useEffect, useState} from "react";
import {deleteDoc, addDoc,serverTimestamp, collection,doc, getDocs, query, onSnapshot, where, orderBy, startAt, QuerySnapshot} from 'firebase/firestore';
import {db} from "./functions/firebase"; 
import CartCard from "./CartCard"
import GetCurrentUser from "./functions/GetCurrentUser";
import './style-sheets/ShoppingCart.css'


const ShoppingCart = () => {
    const loggeduser = GetCurrentUser();
 
    const [cartData, setCartData] = useState([]);
    const [totalprice, setTotalPrice] = useState(0);
    const [orderEmail, setOrderEmail] = useState('');
    useEffect(() => {
      if (loggeduser) {
        const path = `cart-${loggeduser[0].uid}`;
        const cartRef = collection(db, path);
  
        const unsubscribe = onSnapshot(cartRef, (querySnapshot) => {
          const cartArray = [];
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartData(cartArray);
  
          // Calculate the total price and update the state
          const newTotalPrice = cartArray.reduce(
            (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
            0
          );
          setTotalPrice(newTotalPrice);
        });
  
        return () => {
          // Unsubscribe from the snapshot listener when the component unmounts
          unsubscribe();
        };
      }
    }, [loggeduser, cartData]);
    
    const handleCheckout = async () => {
      // Check if the email is filled
      if (!orderEmail.trim()) {
        alert('Please enter your email before proceeding to checkout.');
        return;
      }
  
      // Add the order to the database
      try {
        const orderData = {
          userId: loggeduser[0].uid,
          items: cartData,
          total: totalprice,
          timestamp: serverTimestamp(),
          userEmail: orderEmail,
        };
  
        // Replace 'orders' with your actual database path
        const ordersRef = collection(db, 'orders');
        await addDoc(ordersRef, orderData);
  
        // Clear the cart and display a success message
        setCartData([]);
        setTotalPrice(0);
        setOrderEmail('');

        const cartPath = `cart-${loggeduser[0].uid}`;
        const cartRef = collection(db, cartPath);
        const cartSnapshot = await getDocs(cartRef);

        cartSnapshot.forEach(async (cartDoc) => {
        await deleteDoc(doc(cartRef, cartDoc.id));
        });
        alert('Order placed successfully!');

  
      } catch (error) {
        console.error('Error adding order to the database:', error.message);
        alert('Failed to place the order. Please try again.');
      }
    };
    
    if(!loggeduser) {
      return (
        <div className="shoppingCart">
          <div className='cart-head'> Your are not signed in</div>    
        </div> 
      );
  }
    return (        
        <div className="shoppingCart">
        {cartData && cartData.length > 0 ? <div> 
          <div className='cart-head'> Your Cart Items </div>

            <div className="shopping-cart-container">
              <div className='allcartitems'>
                {cartData.map((item) => (
                  <CartCard key = {item.id} 
                            item = {item}
                            userid={loggeduser[0].uid}/>
                ))}
              </div>
              <div className="order-summary-container">
                <div className = "set-order-email">
                  <div className="order-summary-email"> Enter your email. We need it to send you the order</div>
                  <input  type = "text" className="email-text" onChange={(e) => {setOrderEmail(e.target.value)}} placeholder = "Your email" required/>     
                </div>
                <div className="order-summary">
                  <div className="order-summary-title"> Your Order Summary</div>
                  <div className="total-price">
                    <div>Product total: </div>
                    <div> {totalprice} RON </div>
                  </div>
                  <div className="total-price">
                    <div>Delivery through email </div>
                  </div>
                  <div className="total">
                    Total:
                  </div>
                  <div className="total-price-final">
                    {totalprice} RON
                  </div>
                  <div className="checkout-button-div"> 
                    <button className="checkout-button" onClick= {handleCheckout}> Proceed to checkout </button> 
                  </div> 
                  
                </div>
                </div>
              </div>
          </div> : <div className="cart-head">
            Your cart is empty!
          </div>}
      </div>      
    );
  };

  export default ShoppingCart;