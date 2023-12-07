import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {addDoc, getDoc, doc, collection,deleteDoc} from "firebase/firestore";
import {db} from "./functions/firebase"; // Import your Firebase configuration
import CathegoryList from "./functions/CathegoryList";
import GetCurrentUser from "./functions/GetCurrentUser"
import AddToCart from "./functions/AddToCart";
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const SpecificProductPage = () => {
    const history = useHistory();
    const loggeduser = GetCurrentUser();
    const {id} = useParams();
    const [product, setProduct] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');


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
    
    const handleEditItem = () => {
        console.log("the product is:" + product.id);
        history.push({ 
            pathname: `/edit-page/${product.name}`,
            state: {productId: id },
        });
    }

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        try {
          const productDocRef = doc(db, 'products', id);
          await deleteDoc(productDocRef);
          setSuccessMsg(`Product ${product.name} deleted successfully!`);
        } catch (error) {
          console.error('Error deleting product:', error.message);
          setUploadError('Error deleting product. Please try again.');
        }
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
            {successMsg && <div className='success-msg'>{successMsg}</div>}
        {uploadError && <div className='error-msg'>{uploadError}</div>}
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
                {loggeduser && loggeduser[0].isAdmin ? <div> 
                <button className = 'btn-specific' onClick={handleEditItem}>
                    Edit item
                </button>
                <button className="submit-delete-button" onClick = {handleDeleteProduct}>🗑️ Delete product</button>

                </div> :
                <button className = 'btn-specific' onClick={handleAddToCart}>
                    Add to cart
                </button>
                }
            </div>
            </div>
        </div>
    </div>
    
}

export default SpecificProductPage;