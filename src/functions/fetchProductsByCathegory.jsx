import { collection, getDocs, query, where } from 'firebase/firestore';
import {db} from "./firebase"; // Import your Firebase configuration
import productConverter from "./Product";


async function fetchProductsByCathegory() {
  const q = query(collection(db, "products"));//, where("name", "==", {cathegory})); 
  const querySnapshot = await getDocs(q);
  const products = [];

  querySnapshot.forEach((doc) => {
    // Inside this loop, you can convert the Firestore data to your custom object
    const product = productConverter.fromFirestore(doc, {});
    products.push(product);
  });


  return products;
}

export default fetchProductsByCathegory;