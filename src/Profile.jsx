import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser'
import { updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import {db, auth} from "./functions/firebase"

const Profile = () => {

  const user = GetCurrentUser();

  const [username, setName] = useState(user ? user[0].username : '');
  const [email, setEmail] = useState(user ? user[0].email : '');

  const handleUpdateName = async () => {
    try {
      await updateDoc(doc(dc, 'users', user.id), { username: username });
      alert('Name updated successfully!');
    } catch(error) {
        console.error('Error updating name:', error.message);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateDoc(doc(db, 'users', user.id), {email: email });
      alert('Email updated successfully!');
    } catch(error) {
      console.error('Error updating email:', error.message);
    } 
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your email for further instructions!');
    } catch(error) {
      console.error('Eror sending password reset email:', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteDoc(doc(db, 'users', user.id));

      await auth.currrentUser.delete();

      alert('Account deleted successfully!');
    } catch(error) {
      console.error('Error deleting account:', error.message);
    };
  };

  const handleViewOrderHistory = () => {
    alert('Navigating to order history...');
  };
  
  if(!user) {
    return <p>Loading...</p>;
  }
  console.log(user);

  return (
    <div className='profile-container'>
      <p>Your Profile</p>
        <Link to="/signup" id="navbarButton">Signup</Link>
        <Link to="/login" id="navbarButton">Login</Link>
        <h1>User Profile</h1>
      <p>Name: {user[0].username}</p>
      <p>Email: {user[0].email}</p>

      <div>
        <label>
          New Name:
          <input type="text" value={username} onChange={(e) => setName(e.target.value)} />
        </label>
        <button onClick={handleUpdateName}>Update Name</button>
      </div>

      <div>
        <label>
          New Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>

      <div>
        <div>
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      </div>

      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        <button onClick={handleViewOrderHistory}>View Order History</button>
      </div>     
    </div>
  )
}

export default Profile