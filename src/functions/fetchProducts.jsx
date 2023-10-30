import { collection, getDocs } from 'firebase/firestore';
import {db} from "./firebase"; // Import your Firebase configuration
import productConverter from "./Product";


async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = [];

  querySnapshot.forEach((doc) => {
    // Inside this loop, you can convert the Firestore data to your custom object
    const product = productConverter.fromFirestore(doc, {});
    products.push(product);
  });

  // Now, 'products' is an array of Product instances
  /*console.log(products);

  // You can access custom object methods like 'toString' on these instances
  products.forEach((product) => {
    console.log(product.toString());
  });*/
  return products;
}

export default fetchProducts;