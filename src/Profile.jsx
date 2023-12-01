import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import GetCurrentUser from './functions/GetCurrentUser'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import {db, auth} from "./functions/firebase"

const Profile = () => {

  const user = GetCurrentUser();

  const [username, setName] = useState(user ? user[0].username : '');
  const [email, setEmail] = useState(user ? user[0].email : '');
  const [emailSuccessMsg, setEmailSuccessMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [nameSuccessMsg, setNameSuccessMsg] = useState();
  const [nameErrorMsg, setNameErrorMsg] = useState();

  const handleUpdateName = async () => {
    try {
      await updateDoc(doc(db, 'users', user[0].id), { username: username });
      setNameSuccessMsg('Name updated successfully. Refresh the page')      
    } catch(error) {
        console.error('Error updating name:', error.message);
        setNameErrorMsg('Something went wrong!');
    }
  };
  

  const handleUpdateEmail = async () => {
    try {
      await updateDoc(doc(db, 'users', user[0].id), {email: email });
      setEmailSuccessMsg('Email updated successfully! Refresh the page to see update')
    } catch(error) {
      console.error('Error updating email:', error.message);
      setEmailErrorMsg('There was an error updating the email');
    } 
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user[0].email);
      alert('Password reset email sent. Check your email for further instructions!');
    } catch(error) {
      console.error('Eror sending password reset email:', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteDoc(doc(db, 'users', user[0].id));

      await auth.currentUser.delete();

      alert('Account deleted successfully!');
    } catch(error) {
      console.error('Error deleting account:', error.message);
    };
  };

  const handleViewOrderHistory = () => {
    alert('Navigating to order history...');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  
  if(!user) {
      return (
        <div className='profile-container'>
          <h1>You are not signed in.</h1>
          <p>
          <Link to="/signup" id="links">Signup</Link> or <Link to="/login" id="links">Login</Link>
          </p>
        </div>
        
      );
  }

  return (
    <div className='profile-container'>
      <form className='profile-form'>
          

          <div>
              <h1>Your Profile</h1>
                <nav className='loginBar'>
                    <Link to="/signup" id="links">Signup</Link> <Link to="/login" id="links">Login</Link>
                </nav>
                
                <h1>User Profile</h1>
              <p>Name: {user[0].username}</p>
              <p>Email: {user[0].email}</p>
              <label>
                  New Name: <input type="text" value={username} onChange={(e) => setName(e.target.value)} />
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
          </div>

              
      

          <div>
            <label>
              New Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
            <button type='button' onClick={handleUpdateEmail}>Update Email</button>  <button type='button' onClick={handleResetPassword}>Reset Password</button>
              
          </div>


          <div>
            <button type='button' onClick={handleDeleteAccount}>Delete Account</button> <button type='button' onClick={handleViewOrderHistory}>View Order History</button> <button type='button' onClick={handleLogout}>Log Out</button>
          </div>   

            
      </form>
    </div>
  )
}

export default Profile