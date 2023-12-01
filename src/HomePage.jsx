import { useEffect, useState} from "react";
import { collection, getDocs, query, orderBy, limit} from 'firebase/firestore';
import {db} from "./functions/firebase"; // Import your Firebase configuration
import CathegoryList from "./functions/CathegoryList";
import ProductContainer from "./functions/ProductContainer";
import {Link} from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser';
import cartlogo from './assets/shopping-cart-3045.svg'
import addlogo from './assets/add-button-12017.svg'
import profilelogo from './assets/person-244.svg'

const HomePage = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
              const productsRef = collection(db, 'products'); // Replace 'products' with your collection name
              const querySnapshot = await getDocs(query(productsRef, orderBy('popularity', 'desc'), limit(12)));
      
              const products = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              setPopularProducts(products);
            } catch (error) {
              console.error('Error fetching popular products:', error);
            }
          };
        console.log("fetching popular products!!");
    fetchPopularProducts();
  }, []);
    return (
        <div className="Product-page-container">  
        <div className = "category-menu">
          <CathegoryList title= "All Categories"/>
        </div>
        <div className="product-list-container">
            <h1>Or top picks! </h1>
            <div className="product-list">
            {popularProducts.map((product) => (
              <ProductContainer key={product.id}
              product = {product}/>
            ))}
            </div>
        </div>
      </div>
    );
    
}

export default HomePage;