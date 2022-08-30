import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import Header from '../Core/Header'
import ShareProfile from '../Core/ShareProfile'
import Analytics from './Analytics'
import ProfileCard from './ProfileCard'
import ProfileContents from './ProfileContents'

const Profile = () => {
  useEffect(()=>{
    document.title = "I Watched It | Profile"
  },[])
  return (
    isAuthenticated() ? (
      <div className='profile__container'>
          <Header location="profile" />
          <Analytics />
          <ProfileCard />
          <ShareProfile />
          <ProfileContents />
      </div>
    ) : (<Navigate to="/" />)
  )
}

export default Profile