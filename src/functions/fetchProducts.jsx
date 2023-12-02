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
  return products;
}

export default fetchProducts;