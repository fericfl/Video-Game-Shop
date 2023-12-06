import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./functions/firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { collection, getDocs, query, where, addDoc, Firestore,orderBy,deleteDoc} from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const EditPage = () => {
    const location = useLocation();
    const productId = location.state?.productId || '0';

    const [genre, setGenre] = useState([]);
    const [name, setName] = useState("");
    const [popularity, setPopularity] = useState();
    const [price, setPrice] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState("");

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const [product, setProduct] = useState('');
    const [categories, setCategories] = useState([]);

    const [suggestedPublishers, setSuggestedPublishers] = useState([]);

    const handleDeleteProduct = async (e) => {
      e.preventDefault();
      try {
        const productDocRef = doc(db, 'products', productId);
        await deleteDoc(productDocRef);
        setSuccessMsg(`Product ${name} deleted successfully!`);
      } catch (error) {
        console.error('Error deleting product:', error.message);
        setUploadError('Error deleting product. Please try again.');
      }
    };
    
    

        useEffect(() => {
            const fetchDistinctPublishers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const uniquePublishers = new Set();

                querySnapshot.forEach((doc) => {
                const publisher = doc.data().publisher;
                uniquePublishers.add(publisher);
                });

                // Convert the Set to an array
                const distinctPublishersArray = Array.from(uniquePublishers);
                setSuggestedPublishers(distinctPublishersArray);
            } catch (error) {
                console.error('Error fetching distinct publishers:', error.message);
            }
            };

            fetchDistinctPublishers();
        }, []);
    
      const handlePublisherChange = (e) => {
        setPublisher(e.target.value);
      };

    const fetchCategories = async () => {
      const categoryRef = collection(db, "categories");
      const q = query(categoryRef, orderBy("name")); // Sort categories alphabetically by name
  
      try {
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
  
    useEffect(() => {
      console.log("fetching cat");
      fetchCategories();
    }, []);


    useEffect(() => {
        const getProduct = async () => {
            try {
                console.log(productId);
              const docRef = doc(db, 'products', productId);
              const docSnap = await getDoc(docRef);
          
              if (docSnap.exists()) {
                const productData = docSnap.data();
                setProduct(productData);
                setName(productData.name || ''); // Use default value if 'name' is undefined
                setGenre(productData.genre || []); // Use default value if 'genre' is undefined
                setPopularity(productData.popularity || 0); // Use default value if 'popularity' is undefined
                setPrice(productData.price || 0);
                setPublisher(productData.publisher || '');
                setDescription(productData.description || '');
                setProductImage(productData.productImage || '');
            } else {
                console.error('Document does not exist.');
              }
            } catch (error) {
              console.error('Error fetching product:', error.message);
            }
          };
        getProduct();
      }, []);

    const types = ['image/png', 'image/jpeg'];
    const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('');
            }else{
                setProductImage(null);
                setImageError('not correct type');
            }
        }else{
            setImageError('please select your file');
        }
    }
    const handleUpdateProduct = (e) => {
      e.preventDefault();
      const productDocRef = doc(db, 'products', productId);
      updateDoc(productDocRef, {
        genre,
        name,
        popularity,
        price,
        publisher,
        description,
      });
      setSuccessMsg('Product updated successfully!');
    };
    
    const handleUpdateImage = (e) => {
      e.preventDefault();
    
      if (productImage !== '') {
        const storageRef = ref(storage, `Products/${name}.png`);
        const productDocRef = doc(db, 'products', productId);
    
        uploadBytes(storageRef, productImage)
          .then(() => getDownloadURL(storageRef))
          .then((url) => {
            updateDoc(productDocRef, {
              productImage: url,
            });
            setSuccessMsg('Image updated successfully!');
          })
          .catch((error) => {
            console.error('Error updating image:', error.message);
            setUploadError('Error updating image. Please try again.');
          });
      } else {
        // Handle case when no file is selected, provide feedback or take appropriate action
        console.log('No file selected. Please select a file.');
      }
    };
    
    
    return <div className="AddProductContainer">
      
    <form className="AddProductForm">
        <h1> Add Data </h1>
        <h1> Add Data </h1>

        {successMsg && <div className='success-msg'>{successMsg}</div>}
        {uploadError && <div className='error-msg'>{uploadError}</div>}

        <label>Game name</label>
        <input type = "text" onChange={(e) => {setName(e.target.value)}} value={name}>     
        </input>

        <label>Genre</label>
                <select
                        onChange={(e) => {
                        setGenre(Array.from(e.target.selectedOptions, (option) => option.value));
                        }}
                        multiple={true}
                        >
                        {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                    <label className="colored-label">Selected Genres: {genre.join(', ')}</label>


        <label>Popularity</label>
        <input type = "int" onChange={(e) => {setPopularity(e.target.value)}} value={popularity}>     
        </input>

        <label>Price</label>
        <input type = "text" onChange={(e) => {setPrice(e.target.value)}} value={price}>     
        </input>

        <label>Publisher</label>
                <input
                    type="text"
                    value={publisher}
                    onChange={handlePublisherChange}
                    list="publishers"
                    placeholder="Publisher"
                />
                <datalist id="publishers">
                    {suggestedPublishers.map((suggestedPublisher, index) => (
                    <option key={index} value={suggestedPublisher} />
                    ))}
                </datalist>
                <label className="colored-label">Selected Publisher: {publisher}</label>

        <label>Description</label>
        <textarea
            className="description-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            ></textarea>
        
       
        <button className="submit-button" type='submit' onClick = {handleUpdateProduct}>Update product</button>

        <label>Image</label>
        <input onChange={handleProductImg} type = "file" />     
        {imageError && <>
            <div className="error=msg"> {imageError}</div>
        </>}

        <button className="submit-button" type='submit' onClick = {handleUpdateImage}>Update image</button>
        <button className="submit-delete-button" onClick = {handleDeleteProduct}>🗑️ Delete product</button>
        
    </form>
</div>
}

export default EditPage;