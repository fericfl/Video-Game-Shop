import React,{useState} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg]  = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a new user using Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user information to Firestore database
      await addDoc(collection(db, "users"), {
        username: username,
        email: email,
        uid: user.uid,
        isAdmin: false, // Assuming the default value for isAdmin is false
      });
  
      // Display success message
      setSuccessMsg('New user added successfully. You will now be automatically redirected to the login page.');
      setUsername('');
      setEmail('');
      setPassword('');
  
      // Redirect to the login page after a delay
      setTimeout(() => {
        setSuccessMsg('');
        window.location.href = '/login';
      }, 4000);
    } catch (error) {
      console.error('Error during signup:', error);
  
      // Handle specific error cases
      if (error.code === 'auth/invalid-email') {
        setErrorMsg('Invalid email address.');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Email address is already in use.');
      } else {
        setErrorMsg('An error occurred during signup. Please try again.');
      }
    }
  };
  

  return ( 
      <div className='signup-container'>
          <form className='signup-form' onSubmit={handleSubmit}>
              <p>Create Account</p>

              {successMsg && (
                <div className='success-msg'>
                    {successMsg}
                </div>
              )}
              {errorMsg && (
              <div className='error-msg'>
                    {errorMsg}
              </div>)}
              <p>Your Name</p>
              <input onChange={(e)=>setUsername(e.target.value)}
              type='text' placeholder='John Dee'/>
              
              <p>Your Email</p>
              <input onChange={(e)=>setEmail(e.target.value)}
              type='text' placeholder='example@email.com'/>

              <p>Your Password</p>
              <input onChange={(e)=>setPassword(e.target.value)}
              type='password' placeholder='Your password'/>

              <p>
                  <button type='submit'>Sign Up</button>
                  <div>
                    <span>Already have an account?</span>
                    <Link to='/login'>Log In</Link>
                  </div>
              </p>
          </form>
      </div>
  )
}

export default Signup