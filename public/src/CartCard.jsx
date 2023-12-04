import { updateDoc, doc, getDoc,where, query,getDocs, collection, deleteDoc } from 'firebase/firestore';
import react, { useState } from 'react'
import {db} from "./functions/firebase"; // Import your Firebase configuration

import "./style-sheets/ShoppingCart.css"

const CartCard = ({item, userid}) => {
    const [prodquantity, setProdQuantity] = useState(item.quantity);
    const increasequantity = async () => {
        setProdQuantity(prodquantity + 1);
        const cartRef = collection(db, `cart-${userid}`);
        const q = query(cartRef, where('product.name', '==', item.product.name));
    
        try {
            const querySnapshot = await getDocs(q);
    
                const existingCartItem = querySnapshot.docs[0];
                const existingQuantity = existingCartItem.data().quantity || 0;
    
                await updateDoc(doc(cartRef, existingCartItem.id), {
                    quantity: existingQuantity + 1
                });
                console.log("Quantity increased");
        
        } catch (error) {
            console.error('Error updating quantity:', error.message);
        }
    };
    

    const decreasequantity = async () => {
        if(prodquantity > 1){
            setProdQuantity(prodquantity - 1);
            const cartRef = collection(db, `cart-${userid}`);
            const q = query(cartRef, where('product.name', '==', item.product.name));
        
            try {
                const querySnapshot = await getDocs(q);
        
                    const existingCartItem = querySnapshot.docs[0];
                    const existingQuantity = existingCartItem.data().quantity || 0;
        
                    await updateDoc(doc(cartRef, existingCartItem.id), {
                        quantity: existingQuantity - 1
                    });
                    console.log("Quantity decreased");
            
            } catch (error) {
                console.error('Error updating quantity:', error.message);
            }
        }
       
    };
    const deletecartitem = async () => {
        const cartRef = collection(db, `cart-${userid}`);
        const q = query(cartRef, where('product.name', '==', item.product.name));
    
        getDocs(q)
            .then((querySnapshot) => {
                const docToDelete = querySnapshot.docs[0];
                if (docToDelete) {
                    deleteDoc(docToDelete.ref)
                        .then(() => {
                            console.log('Document deleted');
                        })
                        .catch((error) => {
                            console.error('Error deleting document:', error.message);
                        });
                } else {
                    console.error('Document not found');
                }
            })
            .catch((error) => {
                console.error('Error getting document:', error.message);
            });
    };
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
                <div className='modify-quantity'>
                <button onClick={increasequantity} className='quantity-button'>+</button>
                <div className='quantity'>{prodquantity}</div>
                <button onClick={decreasequantity} className='quantity-button'>-</button>
                </div>
                <button onClick={deletecartitem} className='delete-button'> delete item</button>   
            </div>
            
           
        </div>
    )
}
export default CartCard;