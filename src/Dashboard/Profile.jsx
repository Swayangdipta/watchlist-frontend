import React from 'react'
import Header from '../Core/Header'
import ProfileCard from './ProfileCard'

const Profile = () => {
  return (
    <div className='profile__container'>
        <Header location="profile" />
        <ProfileCard />
    </div>
  )
}

export default Profile