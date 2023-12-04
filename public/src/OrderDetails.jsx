import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from "./functions/firebase";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
  
    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          // Fetch order details
          const orderRef = doc(collection(db, "orders"), orderId);
          const orderSnapshot = await getDoc(orderRef);
  
          if (orderSnapshot.exists()) {
            const orderData = { ...orderSnapshot.data(), id: orderSnapshot.id };
  
            // Fetch items within the order
            const itemsQuery = query(collection(db, "items"));
            const itemsSnapshot = await getDocs(itemsQuery);
            const items = itemsSnapshot.docs.map((itemDoc) => ({ ...itemDoc.data(), id: itemDoc.id }));
  
            // Add items to the orderData
            orderData.items = items;
            console.log(items);
  
            setOrder(orderData);
          } else {
            console.log("Order not found");
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      };
  
      fetchOrderDetails();
    }, [orderId]);
  
    return (
      <div className="order-container">
        <h1>Order Details</h1>
        {order ? (
          <div>
            <p>Order ID: {order.id}</p>
            <p>Amount: {order.amount}</p>
            <p>Date: {order.timestamp.toDate().toLocaleDateString()}</p>
            
            <h2>Items in the Order:</h2>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <p>Item ID: {item.id}</p>
                  <p>Name: {item.product.name}</p>
                  <p>Price: {item.product.price}</p>
                  <p>Publisher: {item.product.publisher}</p>
                  <p>Genres: {item.product.genre.join(", ")}</p>
                  {/* Add more item details as needed */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  
export default OrderDetails;