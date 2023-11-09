import { useState } from "react";
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import {db, storage} from "./firebase";
import { getStorage, ref, getDownloadURL} from "firebase/storage";


const AddProduct = () => {
    const [genre, setgetGenre] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [popularity, setPopularity] = useState();
    const [price, setPrice] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState("");

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    function GetCurrentUser(){
        return null;
    }

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
        	
    const loggeduser = GetCurrentUser();
   
    const handleAddProdduct = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `Products/${name}.png`);

    }
    return (
        <div className="AddProductContainer">
            <form className="AddProductForm">
                <p> Add Data </p>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {uploadError && <div className='error-msg'>{uploadError}</div>}

                <label>Game name</label>
                <input type = "text" onChange={(e) => {setName(e.target.value)}} placeholder = "Game">     
                </input>

                <label>Id</label>
                <input type = "text" onChange={(e) => {setId(e.target.value)}} placeholder = "Id">     
                </input>

                <label>Genre</label>
                <input type = "text" onChange={(e) => {setGenre(e.target.value)}} placeholder = "Genre">     
                </input>

                <label>Popularity</label>
                <input type = "int" onChange={(e) => {setPopularity(e.target.value)}} placeholder = "Popularity">     
                </input>

                <label>Price</label>
                <input type = "text" onChange={(e) => {setPrice(e.target.value)}} placeholder = "Price">     
                </input>

                <label>Publisher</label>
                <input type = "text" onChange={(e) => {setPublisher(e.target.value)}} placeholder = "Publisher">     
                </input>

                <label>Description</label>
                <input type = "text" onChange={(e) => {setDescription(e.target.value)}} placeholder = "Description">     
                </input>
                
                <label>Image</label>
                <input onChange={handleProductImg} type = "file" />     
                {imageError && <>
                    <div className="error=msg"> {imageError}</div>
                </>}
                <button type='submit'>Add</button>
            </form>
        </div> 
    )
}

export default AddProduct;