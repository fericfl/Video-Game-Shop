import { useEffect, useState} from "react";
import { collection, getDocs, query, onSnapshot, where, orderBy, startAt} from 'firebase/firestore';
import {db} from "./firebase"; 
import CathegoryList from "./CathegoryList";
import ProductContainer from "./ProductContainer";

const ProductList = ({category}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      const getProducts = () => {
        const productArray = [];
        const q = query(collection(db, 'products'), where('genre', 'array-contains', category));
        getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productArray.push({...doc.data(), id:doc.id})
          })
          setProducts(productArray)
        })
        .catch((error) => {
              console.log(error.message)
        })
      }
      getProducts()      
    }, []);

    return (
      <div className="Product-page-container">
        <div className = "category-menu">
          <CathegoryList title= "All Categories"/>
        </div>
        <div className="product-list-container">
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
  
  export default ProductList;