import React, { useEffect, useState } from "react";
import {where,query, addDoc, getDoc, doc, collection, getDocs, QuerySnapshot, updateDoc} from "firebase/firestore";
import {db} from "./firebase"; // Import your Firebase configuration
const AddToCart = ({loggeduser, product}) => {
    if (loggeduser) {
        // Check if the product is already in the cart
        console.log("trying to add to cart");
        const cartRef = collection(db, `cart-${loggeduser.uid}`);
        const q = query(cartRef, where('product.name', '==', product.name));
             getDocs(q)
            .then((querySnapshot) => {
                // If the product is not in the cart, add it
                if (querySnapshot.empty) {
                    addDoc(cartRef, {
                        product,
                        quantity: 1
                    })
                        .then(() => {
                            console.log("added product");
                        })
                } else {
                    const existingCartItem = querySnapshot.docs[0];
                    const existingQuantity = existingCartItem.data().quantity || 0;

                    updateDoc(doc(cartRef, existingCartItem.id), {
                        quantity: existingQuantity + 1
                    })
                        .then(() => {
                            console.log("added with quantity increased ")
                        })                        
                    }
            })
    } else {
        alert('You have to be logged in to add to cart!');

    }
};

export default AddToCart;