import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {addDoc, getDoc, doc, collection} from "firebase/firestore";
import {db} from "./functions/firebase"; // Import your Firebase configuration
import CathegoryList from "./functions/CathegoryList";
import GetCurrentUser from "./functions/GetCurrentUser"
import AddToCart from "./functions/AddToCart";
import {Link} from 'react-router-dom'


const SpecificProductPage = () => {
    const loggeduser = GetCurrentUser();
    const {id} = useParams();
    const [product, setProduct] = useState('');


    useEffect(() => {
        const getProduct = async () => {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);
          setProduct(docSnap.data());
        };
        getProduct();
      }, [id]);

    const handleAddToCart = () => {
        AddToCart({ loggeduser, product });
    };
    

    console.log(loggeduser);
    
    return <div className="Product-page-container">
        <div className = "category-menu">
          <CathegoryList title= "All Categories"/>
        </div>
        <div className="specific-product-details-container">
            <div className="title-and-image">
                <img className="product-image" src={product.productImage} />
            </div>
            <div className="product-details">
            <h1 className="specific-product-title">
                {product.name}
                </h1>
                <div className="specific-product-description">
                    <h1>Description:</h1>
                    {product.description}
                </div>
                <div className="specific-product-genre">
                    <h1>Genre:</h1>
                    <div className="product-genre">{product.genre && product.genre.join(', ')}</div>
                </div>
                    <div className="specific-product-price">
                    <h1>Price:</h1>
                    <div className="product-price">{product.price} RON</div>
                </div>
                <div className = "buy-cart">
                <button className = 'btn-specific' onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
            </div>
        </div>
    </div>
    
}

export default SpecificProductPage;