import React from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import {ImBin,ImPencil} from 'react-icons/im'

const ProfileCard = () => {

    const {user} = isAuthenticated()
  return (
    <div className='profile__card'>
      <div className="profile__info">
        <h2 className="profile__card__item">{user.name}</h2>
        <h2 className="profile__card__item">{user.email}</h2>        
      </div>

        <div className='profile__btns'>
          <div className="profile__delete__btn profile__edit__btn"><ImPencil /></div>
          <div className="profile__delete__btn"><ImBin /></div>          
        </div>

    </div>
  )
}

export default ProfileCard