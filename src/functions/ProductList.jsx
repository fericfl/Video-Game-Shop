import { useEffect, useState} from "react";
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import { query, onSnapshot, doc, updateDoc, collection, getDocs, getDoc, QuerySnapshot} from "firebase/firestore";
import fetchProducts from "./fetchProducts";
 

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      const getProducts = () => {
        const productArray = [];
        const path = '/Products';
        getDocs(collection(db, path).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productArray.push({...doc.data(), id:doc.id})
          })
          setProducts(productArray)
        }).catch((error) => {
          console.log(error.message)
        }))
      }
      getProducts()      
    }, {});
  
    const storage = getStorage();
  
    useEffect(() => {
      if (selectedProduct) {
        const storageRef = ref(storage, `Products/${selectedProduct.name}.png`);
        const downloadURL = async () => {
          try {
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        };
        downloadURL();
      }
    }, [selectedProduct, storage]);
  
    return (
      <div className="product-list">
        <h1>
          {products.map((productItem) => (
            <p key={productItem.id}>
              {productItem.name}
            </p>
          ))}
        </h1>
        {selectedProduct && (
          <img src={imageUrl} alt={selectedProduct.name} />
        )}
      </div>
    );
  };
  
  export default ProductList;