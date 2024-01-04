import React from 'react'
import GetCurrentUser from './functions/GetCurrentUser'
import { doc, updateDoc, collection, getDocs, query, where} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import {db, auth} from "./functions/firebase"
import './style-sheets/ShoppingCart.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Profile = () => {
  const user = GetCurrentUser();
  console.log(user);
  const history = useHistory();
  const authInstance = getAuth();

  const userAuth = authInstance.currentUser;
  if (userAuth !== null) {
    const displayName = userAuth.displayName;
    const email = userAuth.email;
    const photoURL = userAuth.photoURL;
    const emailVerified = userAuth.emailVerified;
    const uid = userAuth.uid;
  }
  
  const handlePromoteToAdmin = async () => {
    try {
      if (selectedUser) {
        const q = query(collection(db, "users"), where("uid", "==", selectedUserId));
        const data = await getDocs(q);
        const selectedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];

        const userDocRef = doc(db, 'users', selectedUser.id);
        await updateDoc(userDocRef, { isAdmin: true });
        setSelectedUserIsAdmin(true);

        alert('User promoted to admin successfully!');
      } else {
        console.error('No selected user to promote to admin.');
      }
    } catch (error) {
      console.error('Error promoting user to admin:', error.message);
    }
  };
  
  const handleViewOrderHistory = (userId) => {
    history.push({
      pathname: `/order-history/${userId}`,
    })
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  
  const handleLogIn = () => {
    window.location.href='/login';
  }

  const handleSignUp = () => {
    window.location.href='/signup';
  }

  if(!user) {
      return (
        <div className='profile-container'>
          <form className='profile-form'>
            <h1>You are not signed in.</h1>
            <p>
            <button type='button' onClick={handleLogIn}>Log In</button>  <button type='button' onClick={handleSignUp}>Sign Up</button>
            </p>
          </form>
        </div>
        
      );
  }

  return (
    <div className='profile-container'>
      <form className='profile-form' >

        {user && (
          <div>
            <h1>Your Profile</h1>
            <p>Name: {userAuth.displayName}</p>
            <p>Email: {userAuth.email}</p>
            <button type='button' onClick={() => handleViewOrderHistory(userAuth.uid)}>View Order History</button>
          </div>
        )}

        <button type='button' onClick={handleLogout}>Log Out</button>
      </form>
    </div>
  );
};

export default Profile