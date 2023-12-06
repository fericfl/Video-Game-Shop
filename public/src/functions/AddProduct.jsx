import { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc, Firestore,orderBy } from 'firebase/firestore';
import {db, storage} from "./firebase";
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";


const AddProduct = () => {
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

    const [categories, setCategories] = useState([]);
    const [suggestedPublishers, setSuggestedPublishers] = useState([]);

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
        }, [successMsg]);
    
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
        	
    const storage = getStorage();

    const handleAddProdduct = (e) => {
        e.preventDefault();
        
        const storageRef = ref(storage, `Products/${name}.png`);
    
        uploadBytes(storageRef, productImage)
            .then(() => {
                return getDownloadURL(storageRef);
            })
            .then((url) => {
                return addDoc(collection(db, "products"), {
                    genre,
                    name,
                    popularity,
                    price,
                    publisher,
                    description,
                    productImage: url
                });
            })
            .then(() => {
                // Update the success message state
                setSuccessMsg('Product added successfully!');
            })
            .catch((error) => {
                console.error('Error adding product:', error.message);
                setUploadError('Failed to add product. Please try again.');
            });
    };
    
    return (
        <div className="AddProductContainer">
            <form className="AddProductForm">
                <p> Add Data </p>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {uploadError && <div className='error-msg'>{uploadError}</div>}

                <label>Game name</label>
                <input type = "text" onChange={(e) => {setName(e.target.value)}} placeholder = "Game">     
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
                <input type = "int" onChange={(e) => {setPopularity(e.target.value)}} placeholder = "Popularity">     
                </input>

                <label>Price</label>
                <input type = "text" onChange={(e) => {setPrice(e.target.value)}} placeholder = "Price">     
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
                <input type = "text" onChange={(e) => {setDescription(e.target.value)}} placeholder = "Description">     
                </input>
                
                <label>Image</label>
                <input onChange={handleProductImg} type = "file" />     
                {imageError && <>
                    <div className="error=msg"> {imageError}</div>
                </>}
                <button className="submit-button" type='submit' onClick = {handleAddProdduct}>Add</button>
            </form>
        </div> 
    )
}

export default AddProduct;