import React, { useState, useEffect } from 'react'
import GetCurrentUser from './functions/GetCurrentUser'
import { doc, updateDoc, deleteDoc, collection, getDocs, query, where} from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import {db, auth} from "./functions/firebase"
import './style-sheets/ShoppingCart.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Profile = () => {
  const user = GetCurrentUser();
  const history = useHistory();

  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailSuccessMsg, setEmailSuccessMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [nameSuccessMsg, setNameSuccessMsg] = useState();
  const [nameErrorMsg, setNameErrorMsg] = useState();

  const [userList, setUserList] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      if (user && user[0].email === "admin@email.com") {
        try {
          const usersCollection = collection(db, 'users');
          const querySnapshot = await getDocs(usersCollection);
          const users = querySnapshot.docs.map(doc => doc.data());
          setUserList(users);
        } catch (error) {
          console.error('Error fetching user list:', error.message);
        }
      }
    };

    fetchUserList();
  }, [user && user[0].email === "admin@email.com"]);

  const handleUpdateName = async () => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user[0].uid));
        const data = await getDocs(q);
        const selectedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
    
        // Use the document reference and updateDoc to update the username
        const userDocRef = doc(db, 'users', selectedUser.id);
        await updateDoc(userDocRef, { username: username });
  
      setNameSuccessMsg('Username updated successfully!');
    } catch (error) {
      console.error('Error updating name:', error.message);
      setNameErrorMsg('Something went wrong!');
    }
  };
  

  const handleUpdateEmail = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user[0].email));
      const data = await getDocs(q);
      const selectedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
  
      const userDocRef = doc(db, 'users', selectedUser.id);
      await updateDoc(userDocRef, { email: email });
  
      setEmailSuccessMsg('Email updated successfully! Refresh the page to see the update');
    } catch (error) {
      console.error('Error updating email:', error.message);
      setEmailErrorMsg('There was an error updating the email');
    }
  };
  

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, selectedUserEmail);
      alert('Password reset email sent. Check your email for further instructions!');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if(selectedUser) {
        const q = query(collection(db, "users"), where("uid", "==", selectedUserId));
        const data = await getDocs(q);
        const selectedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
        const userDocRef = doc(db, 'users', selectedUser.id);
        await auth.signOut();
        await deleteDoc(userDocRef);
      }
      else {
        const q = query(collection(db, "users"), where("uid", "==", user[0].uid));
        const data = await getDocs(q);
        const selectedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
        const userDocRef = doc(db, 'users', selectedUser.id);
        await auth.signOut();
        await deleteDoc(userDocRef);
      }
      
  
      alert('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error.message);
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

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedUserName(user.username);
    setSelectedUserEmail(user.email);
    setSelectedUserId(user.uid);
    setUserId(user.uid);
    console.log(userId);
  };

  const handleSearchUser = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const filteredUsers = userList.filter((user) => user.email.includes(searchEmail));
    setSearchedUserList(filteredUsers);
  };

  
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
      <form className='profile-form' onSubmit={handleSearchUser}>

        {user && user[0].email != "admin@email.com" && (
          <div>
            <h1>Your Profile</h1>
            <p>Name: {user[0].username}</p>
            <p>Email: {user[0].email}</p>
            <label className='AddProductForm'>
              New Name: <input className='user-form' type="text" value={username} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type='button' onClick={handleUpdateName}>Update Name</button>
                    {nameSuccessMsg && (
                      <div className='success-msg'>
                        {nameSuccessMsg}
                      </div>
                    )}
                    {nameErrorMsg && (
                      <div className='error-msg'>
                        {nameErrorMsg}
                      </div>
                    )}
            <div/>
            <label className='AddProductForm'>
              New Email: <input className='user-form' type="email" value={selectedUserEmail} onChange={(e) => setSelectedUserEmail(e.target.value)} />
              {emailSuccessMsg && (
                <div className='success-msg'>
                  {emailSuccessMsg}
                </div>
              )}
              {emailErrorMsg && (
                <div className='error-msg'>
                  {emailErrorMsg}
                </div>
              )}
            </label>
            <button type='button' onClick={handleUpdateEmail}>Update Email</button> <button type='button' onClick={handleResetPassword}>Reset Password</button>
            <button type='button' onClick={() => handleViewOrderHistory(user[0].uid)}>View Order History</button>
            <button type='button' onClick={handleDeleteAccount}>Delete Account</button>  
          </div>
        )}

        {user && user[0].email === 'admin@email.com' && (
          <div>
            <h1>Your Profile</h1>
            <p>Name: {user[0].username}</p>
            <p>Email: {user[0].email}</p>
            <h1>User List</h1>
            <label className='UserForm'>
              Search User by Email:{' '}
              <input
                className='user-form'
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </label>
            <select className="select-list" onChange={(e) => handleSelectUser(JSON.parse(e.target.value))}>
              <option value="">Select a user</option>
              {searchedUserList.map((user, index) => (
                <option key={index} value={JSON.stringify(user)}>
                  {user.username} - {user.email}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedUser && (
                  <div>
                    <h1>Selected User Profile</h1>
                    <p>Name: {selectedUser.username}</p>
                    <p>Email: {selectedUser.email}</p>
                  </div>
        )}

        {selectedUser && user && user[0].email === "admin@email.com" && (
          <div>
             
            <button type='button' onClick={() => handleViewOrderHistory(selectedUserId)}>View User Order History</button> 
            <button type='button' onClick={handleDeleteAccount}>Delete Account</button>  
          </div>
        )}
        <button type='button' onClick={handleLogout}>Log Out</button>
      </form>
    </div>
  );
};

export default Profile