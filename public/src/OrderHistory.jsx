import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./functions/firebase";
import GetCurrentUser from "./functions/GetCurrentUser";
import { Link } from "react-router-dom";
  
function OrderHistory() {
    const user = GetCurrentUser();
    const [orders, setOrders] = useState([]);
    

    useEffect(() => {
        if(user) {
            const fetchOrders = async () => {
                const q = query(collection(db, "orders"), where("userId", "==", user[0].uid), orderBy("timestamp", "desc"));
                const data = await getDocs(q);
                setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            };

            fetchOrders();
        }
    }, [user]);

    return (
        <div className="order-container">
            <div className='cart-head'>Order History</div>
            {user ? (
            <div>
                <div className='welcome'>Welcome, {user[0].username}!</div>
                <div>
                {orders.map((order) => (
                    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <p>Order ID: {order.id}</p>
                    <p>Amount: {order.total} RON</p>
                    <p>Date: {order.timestamp.toDate().toLocaleDateString()}</p>
                    <Link to={`/order-details/${order.id}`}>View Details</Link>
                  </div>
                ))}
                </div>
            </div>
            ) : (
                <div className='cart-head'>Please log in to view your order history.</div>
            )}
        </div>
    );
}

export default OrderHistory;