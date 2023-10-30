import { useState } from "react";
import db from "./firebase";
// import 'firebase/firestore';

const ShoppingCart = () => {
    const [products, setProducts] = useState([]);
    
    const ref = collection(db, "products", );
    
    return (  
        <div className="shoppingCart">
            <h1>
                Welcome to the shopping cart
                {products.map((product) => (
                    <h2>{product.name}</h2>
                ))}
            </h1>
            
        </div>
    );
}

export default ShoppingCart;