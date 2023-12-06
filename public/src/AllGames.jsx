import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./functions/firebase";
import CathegoryList from "./functions/CathegoryList";
import ProductContainer from "./functions/ProductContainer";
import { Link } from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser';
import cartlogo from './assets/shopping-cart-3045.svg'
import addlogo from './assets/add-button-12017.svg'
import profilelogo from './assets/person-244.svg'

const AllGames = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productCollectionRef = collection(db, 'products');
        const querySnapshot = await getDocs(productCollectionRef);
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="Product-page-container">
      <div className="category-menu">
        <CathegoryList title="All Categories" />
      </div>
      <div className="product-list-container">
        <h1>All games!</h1>
        <div className="product-list">
          {products.map((product) => (
            <ProductContainer key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllGames;
