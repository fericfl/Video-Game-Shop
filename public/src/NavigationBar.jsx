import {Link} from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser';
import React, { useEffect, useState } from "react";
import {QuerySnapshot, addDoc, getDocs, doc, collection} from "firebase/firestore";
import {db} from "./functions/firebase"; // Import your Firebase configuration
import cartlogo from './assets/shopping-cart-3045.svg'
import addlogo from './assets/add-button-12017.svg'
import profilelogo from './assets/person-244.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavigationBar = () => {
    const hasSearchBar = true;

    const loggeduser = GetCurrentUser();
    const [cartdata, setcartdata] = useState([]);
    const [search, setSearch] = useState("");
    console.log(loggeduser);
    
    useEffect(() => {
    if(loggeduser){
        const getCartData= async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            console.log(path);
            getDocs(collection(db, path)).then((QuerySnapshot) => {
                QuerySnapshot.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data());
                    cartArray.push({...doc.data(), id:doc.id})
                })
                setcartdata(cartArray)
                console.log('done');
            }).catch('Error error error');
        }
        getCartData();
        console.log("getting cart data!!");
    }}, []);
    const history = useHistory();
    const [formData, setFormData] = useState('');

    const handleFormSubmit = () => {
        // Perform any necessary actions (e.g., form validation, data submission)

        // Navigate to a different page or component with the form data as state
        history.push({
        pathname: `/search-results/${search}`,
        state: { search },
        });
    };

    return(
        <nav className = "navigationBar">
            <Link to="/" id="storeName">
                Video Game Store
            </Link>
            {hasSearchBar && <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={e => {setSearch(e.target.value); console.log(search)}}/>
                <button type="submit" className="searchButton" onClick={handleFormSubmit}>
                </button>
                </div>
            </div>
            }
            <div className="links">
                {loggeduser && loggeduser[0].email === "admin@email.com" ?
                <Link to="/add-product" className="shopping-cart-logo"><img src = {addlogo} alt = "no img"/></Link> 
                : <></>}
                <div className='cart-btn'>
                    <Link to='/shopping-cart' className="shopping-cart-logo"><img src = {cartlogo} alt = "no img"/></Link>
                    <button className='cart-icon-css'>{cartdata.length}</button>
                </div>
                <Link to="/profile" className="shopping-cart-logo"><img src = {profilelogo} alt = "no img"/></Link>
            </div>
        </nav>
    );
}

export default NavigationBar;
