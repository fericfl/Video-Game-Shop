import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt} from 'firebase/firestore';
import {db} from "./functions/firebase"; 
import CathegoryList from "./functions/CathegoryList";
import ProductContainer from "./functions/ProductContainer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const SearchResultsPage = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const search = location.state?.search || 'Default Value';

    useEffect(() => {
        const getProducts = async () => {
            const productArray = [];
            const searchTerm = search.toLowerCase();
        
            try {
              const q = query(
                collection(db, 'products'),
                orderBy('name'),
              );
              const querySnapshot = await getDocs(q);
        
              querySnapshot.forEach((doc) => {
                const productName = doc.data().name.toLowerCase();
                if (productName.includes(searchTerm)) {
                  productArray.push({ ...doc.data(), id: doc.id });
                }
              });
        
              setProducts(productArray);
            } catch (error) {
              console.log(error.message);
            }
          };
        console.log("getting products!");
        getProducts();
        console.log(products);
      }, [search]);
    console.log({search});

    return (
      <div className="Product-page-container">
        <div className = "category-menu">
          <CathegoryList title= "All Categories"/>
        </div>
        <div className="product-list-container">
            {products.length > 0 ? 
                <h1>Our top picks for your search:</h1>
                :
                <h1>
                    No results for your search!
                </h1>
            }
        <div className="product-list">
            {products.map((product) => (
              <ProductContainer key={product.id}
              product = {product}/>
            ))}
            </div>
        </div>
      </div>
    );
  };
  
  export default SearchResultsPage;