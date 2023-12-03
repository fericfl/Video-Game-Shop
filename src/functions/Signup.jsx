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

  const handleSubmit = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>{
          const user = userCredential.user
          addDoc(collection(db, "users"),{
            username: username,
            email: email,
            password: password,
            uid: user.uid
          }).then(() =>{
              setSuccessMsg('New user added successfully, you will now be automatically redirected to login page.')
              setUsername('')
              setEmail('')
              setPassword('')
              setTimeout(() => {
                  setSuccessMsg('');
                  window.location.href = '/login';
              }, 4000);
            })
            
      })
      .catch((error) => {
          if (error.message === 'Firebase: Error (auth/invalid-email).') {
              setErrorMsg('Please fill all required fields')
          }
          if (error.message === 'Firebase: Error (auth/email-already-in-use.') {
            setErrorMsg('User already exists');
          }
        });
  }

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