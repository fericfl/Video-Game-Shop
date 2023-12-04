import { updateDoc, doc, getDoc,where, query,getDocs, collection, deleteDoc } from 'firebase/firestore';
import react, { useState } from 'react'
import {db} from "./functions/firebase"; // Import your Firebase configuration

import "./style-sheets/ShoppingCart.css"

const OrderCard = ({item}) => {
    return (
        <div className = 'cart-prod-container'>
            <div className='cart-prod-imgtitle'>
                <div className='prod-image'> <img src ={item.product.productImage}></img></div>
            </div>
            <div className='productdetails'>
                <div className='prod-title'> {item.product.name}</div>
            </div>
            <div className='price-and-quantity'>
                <div className='prodprice'>{item.product.price} RON</div>
                <div className='quantity'>{item.quantity} items</div>      
            </div>
            
           
        </div>
    )
}
export default OrderCard;