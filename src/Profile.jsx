import React from 'react'
import {Link} from 'react-router-dom'

const Profile = () => {
  return (
    <div className='profile-container'>
      <p>Your Profile</p>
        <Link to="/signup" id="navbarButton">Signup</Link>
        <Link to="/login" id="navbarButton">Login</Link>      
    </div>
  )
}

export default Profile