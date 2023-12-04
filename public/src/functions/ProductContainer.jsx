import React, { useEffect, useState } from "react";

import GetCurrentUser from "./GetCurrentUser"
import AddToCart from "./AddToCart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProductContainer = ({product}) => {
    const history = useHistory();
    const loggeduser = GetCurrentUser();
    const productId = product.id;
    const handleAddToCart = () => {
        AddToCart({ loggeduser, product });
    };
    const handleEditItem = () => {
        console.log("the product is:" + product.id);
        history.push({ 
            pathname: `/edit-page/${product.name}`,
            state: {productId: productId },
        });
    }
    return (
        <div className="product-container">
            <a href = {`/games/${product.id}`}>
                <img className="product-thumbnail" src={product.productImage} />
            </a>

            <div className="product-details">
                <p className="product-title">
                    {product.name}
                </p>
                <p className="product-price"> {product.price} RON</p>
            </div>
            <div className = "buy-cart">
                {loggeduser && loggeduser[0].email === "admin@email.com" ? 
                <button className = 'btn' onClick={handleEditItem}>
                    Edit item
                </button> :
                <button className = 'btn' onClick={handleAddToCart}>
                    Add to cart
                </button>
                }
            </div>
        </div>
    )
}

export default ProductContainer;