import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "./functions/firebase";
import GetCurrentUser from "./functions/GetCurrentUser";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
  
function OrderHistory() {
    const { userId } = useParams();
    const user = GetCurrentUser();
    const [orders, setOrders] = useState([]);
    const history = useHistory();
    

    useEffect(() => {
        if(user) {
            const fetchOrders = async () => {
                const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("timestamp", "desc"));
                const data = await getDocs(q);
                setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
            };

            fetchOrders();
        }
    }, [user]);

    const handleViewDetails = (orderId) => {
        history.push({
            pathname: `/order-details/${orderId}`
        })
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteDoc(doc(db, 'orders', orderId));
            // Refresh the orders after deletion
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            alert('Order deleted successfully!');
        } catch (error) {
            console.error('Error deleting order:', error.message);
            alert('Error deleting order. Please try again.');
        }
    };

    return (
        <div className="order-container">
            <div className='cart-head'>Order History</div>
            {user ? (
            <div>
                <div className='welcome'>Welcome, {user[0].username}!</div>
                <div>
                {orders.map((order) => (
                    <div className="order-details">
                        <p>Order ID: {order.id}</p>
                        <p>Amount: {order.total} RON</p>
                        <p>Date: {order.timestamp.toDate().toLocaleDateString()}</p>
                        <p>Email: {order.userEmail}</p>
                        {user && user[0].email != 'admin@email.com' && (
                            <button type='button' onClick={() => handleViewDetails(order.id)}>View Details</button>
                        )}
                        {user && user[0].email == 'admin@email.com' && (
                            <button type='button' onClick={() => handleDeleteOrder(order.id)}>Delete Order</button>
                        )}
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