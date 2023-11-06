import { useEffect, useState} from "react";
import fetchProducts from "./functions/fetchProducts"
// import 'firebase/firestore';

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Call the fetchProducts function when the component mounts
      async function fetchData() {
        const productsData = await fetchProducts();
        setProducts(productsData);
      }
  
      fetchData();
    }, []);
  
    return (
      <div className="shoppingCart">
        <h1>{products.map((productItem) => {return <p key = {productItem.id}>{productItem.name}</p>}) }</h1>
      </div>
    );
  };

  export default ShoppingCart;