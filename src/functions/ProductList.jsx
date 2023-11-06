import { useEffect, useState} from "react";
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import fetchProducts from "./fetchProducts";
 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      // Call the fetchProducts function when the component mounts
      async function fetchData() {
        const productsData = await fetchProducts();
        setProducts(productsData);
        if (productsData.length > 0) {
          setSelectedProduct(productsData[0]);
        }
      }
  
      fetchData();
    }, []);
  
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