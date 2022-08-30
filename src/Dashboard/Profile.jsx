import React, { useEffect } from 'react'
import Header from '../Core/Header'
import Analytics from './Analytics'
import ProfileCard from './ProfileCard'
import ProfileContents from './ProfileContents'

const Profile = () => {

  useEffect(()=>{
    document.title = "I Watched It | Profile"
  },[])
  return (
    <div className='profile__container'>
        <Header location="profile" />
        <Analytics />
        <ProfileCard />
        <ProfileContents />
    </div>
  )
}

export default Profile