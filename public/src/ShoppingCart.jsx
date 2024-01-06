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
    
    const sendOrderEmail = async (orderId,orderData) => {
      var s = `Order confirmation. Order id ${orderId}`;
      var items = orderData.items;
      try {
        const emailData = {
          to: orderEmail,
          message: {
            html: `
            <head>

            <style>
            * {
              margin: 0;
              font-family: "Quicksand";
              font-size: 15px;
            }
            .order-details {
              margin-bottom: 20px;
            }
            .product-name {
              font-weight: bold;
            }
            .total {
              font-weight: bold;
            }
            .title {
              color: rgb(83, 76, 123);
              font-size: 20px; 
              font-weight: bold;
              padding-bottom: 10px;
            }
          </style>
            </head>
            <div class="title">Thank you for your order!</div>

            <div>
            ${orderData.items.flatMap((order) => (
              Array.from({ length: order.quantity }).map((_, index) => (
                `<div key=${order.id}-${index} class="order-details">
                  <p class="product-name"> Product: ${order.product.name}</p>
                  <p>Key: ${order.id}</p>
                </div>`
              ))
            )).join('')}
              <p class= "total">Total value: ${orderData.total}</p>
            </div>`,
            subject: `Order confirmation`,
          }
        };
        console.log(orderData);
        console.log(orderData.items);

    
        // Replace 'mail' with your actual database path
        const mailRef = collection(db, 'mail'); // Assuming you have a function generateRandomKey() that generates a random key
        await addDoc(mailRef, emailData);
      } catch (error) {
        console.error('Error sending order email:', error.message);
        throw new Error('Failed to send the order email. Please try again.');
      }
    };

    const handleCheckout = async () => {
      // Check if the email is filled
      if (!orderEmail.trim()) {
        alert('Please enter your email before proceeding to checkout.');
        return;
      }else{
        
    
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
          await sendOrderEmail(ordersRef.id, orderData);


    
        } catch (error) {
          console.error('Error adding order to the database:', error.message);
          alert('Failed to place the order. Please try again.');
        }
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