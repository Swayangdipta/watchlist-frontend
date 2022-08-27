import React from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'

const ProfileCard = () => {

    const {user} = isAuthenticated()
  return (
    <div className='profile__card'>
        <h2 className="profile__card__item">Name: {user.name}</h2>
        <h2 className="profile__card__item">Email: {user.email}</h2>
        <div className="profile__delete__btn">Delete Account</div>
    </div>
  )
}

export default ProfileCard