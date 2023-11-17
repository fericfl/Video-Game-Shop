import {Link} from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser';
import React, { useEffect, useState } from "react";
import {QuerySnapshot, addDoc, getDocs, doc, collection} from "firebase/firestore";
import {db} from "./functions/firebase"; // Import your Firebase configuration
import cartlogo from './assets/shopping-cart-3045.svg'
import addlogo from './assets/add-button-12017.svg'
import profilelogo from './assets/person-244.svg'

const NavigationBar = () => {
    const hasSearchBar = false;

    const loggeduser = GetCurrentUser();
    const [cartdata, setcartdata] = useState([]);
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
    }}, [loggeduser, cartdata]);

    return(
        <nav className = "navigationBar">
            <Link to="/" id="storeName">
                Video Game Store
            </Link>
            {hasSearchBar && <div className="search-bar">            
            </div>
            }
            <div className="links">
                {loggeduser && loggeduser[0].email == "ericflorea@email.com" ?
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