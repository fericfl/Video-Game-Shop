import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'
const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setSuccessMsg('Logged in successfully, you will be redirected to home')

      setEmail('')
      setPassword('')
      setErrorMsg('')
      setTimeout(() => {
        setSuccessMsg('');
        // redirect home
      }, 3000)
    }).catch((error) => {
        setErrorMsg('Something went wrong. Please check credentials and try again')
    })

  }

  return (
    <div className='login-container'>
          <form className='login-form' onSubmit={handleLogin}>
              <p>Login Account</p>

              {successMsg && (
                <div className='success-msg'>
                    {successMsg}
                </div>
              )}
              {errorMsg && (
              <div className='error-msg'>
                    {errorMsg}
              </div>)}  
              <p>Your Email</p>
              <input onChange={(e)=>setEmail(e.target.value)}
              type='text' placeholder='example@email.com'/>

              <p>Your Password</p>
              <input onChange={(e)=>setPassword(e.target.value)}
              type='password' placeholder='Your password'/>

              <p>
                  <button onClick={handleLogin}>Login</button>
                  <div>
                    <span>Don't have an account?</span>
                    <Link to='/signup'>Sign Up</Link>
                  </div>
              </p>
          </form>
      </div>
  )
}

export default Login