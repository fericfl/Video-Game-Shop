import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from "./functions/firebase";
import OrderCard from "./OrderCard";
import "./style-sheets/Order.css";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
        try {
            // Reference to the order document
            const orderRef = doc(db, 'orders', orderId);

            // Fetch the order document
            const orderDoc = await getDoc(orderRef);

            if (orderDoc.exists()) {
            // If the order document exists, set the order state
            setOrder(orderDoc.data());
            } else {
            // Handle the case when the order document doesn't exist
            console.log("Order not found");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
            // Handle the error
        }
        };

        // Call the fetchOrderDetails function
        fetchOrderDetails();
    }, [orderId]);
  
    return (
      <div className="order-page-container">
        <div className="cart-head">Order Summary</div>
        {order ? (
          <div className="single-order-container">
            <div className="order-details">
            <p>Order ID: {orderId}</p>
            <p>Amount: {order.total} RON</p>
            <p>Date: {order.timestamp.toDate().toLocaleDateString()}</p>
            </div>
            
            <div className="order-items">
              <div className="order-items-title">Items in the Order:</div>
              <div className="allcartitems">
                {order.items.map((item) => (
                  <div key={item.id} className="cart-prod-container">
                  <div className="cart-prod-imgtitle">
                    <div className="prod-image">
                      <img src={item.product.productImage} alt={item.product.name} />
                    </div>
                  </div>
                  <div className="productdetails">
                    <div className="prod-title">{item.product.name}</div>
                  </div>
                  <div className="price-and-quantity">
                    <div className="prodprice">{item.quantity * Number(item.product.price)} RON</div>
                    <div className="quantity">{item.quantity} items</div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  
export default OrderDetails;