import React, { useState } from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import {ImBin,ImPencil} from 'react-icons/im'
import WarningPopup from './WarningPopup'

const ProfileCard = () => {
  const [warning,setWarning] = useState(false)

    const {user} = isAuthenticated()
  return (
    <div className='profile__card'>
      <div className="profile__info">
        <h2 className="profile__card__item">{user.name}</h2>
        <h2 className="profile__card__item">{user.email}</h2>        
      </div>

        <div className='profile__btns'>
          <div className="profile__delete__btn profile__edit__btn"><ImPencil /></div>
          <div className="profile__delete__btn" onClick={e=>setWarning(!warning)}><ImBin /></div>          
        </div>
        {
          warning && <WarningPopup setWarning={setWarning} />
        }
    </div>
  )
}

export default ProfileCard