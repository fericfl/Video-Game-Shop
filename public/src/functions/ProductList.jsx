import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "./firebase"; 
import CathegoryList from "./CathegoryList";
import ProductContainer from "./ProductContainer";
import { useLocation } from "react-router-dom"; // Correct import statement

const ProductList = () => {
    const location = useLocation(); // Use useLocation hook to get the current location
    const category = location.state?.name || 'Default Value';
    console.log("category in productList is " + category);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        try {
          const productArray = [];
          const q = query(collection(db, 'products'), where('genre', 'array-contains', category));
          const querySnapshot = await getDocs(q);
          
          querySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          });

          setProducts(productArray);
        } catch (error) {
          console.log(error.message);
        }
      };

      getProducts();
    }, [category]); // Include category as a dependency to re-run the effect when category changes

    return (
      <div className="Product-page-container">
        <div className="category-menu">
          <CathegoryList title="All Categories" />
        </div>
        <div className="product-list-container">
          <div className="product-list">
            {products.map((product) => (
              <ProductContainer key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default ProductList;
