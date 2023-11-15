import React, { useEffect, useState } from "react";

import GetCurrentUser from "./GetCurrentUser"
import AddToCart from "./AddToCart";

const ProductContainer = ({product}) => {
    const loggeduser = GetCurrentUser();
    const handleAddToCart = () => {
        AddToCart({ loggeduser, product });
    };
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
                <button className = 'btn' onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductContainer;