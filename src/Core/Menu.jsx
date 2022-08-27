import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { logoutUser, removeUserClient } from '../Auth/helper/authApiCalls'
import Search from './Search'

const Menu = ({location}) => {
    const [openForm,setOpenForm] = useState(false)
    const [loading,setLoading] = useState(false)
    const [redirect,setRedirect] = useState(false)

    const handleLogout = e => {
        setLoading(true)
        logoutUser((data) => {
            if(data?.response?.data?.error){
                toast.error("Faild to logout! Try later.",{theme: 'dark'})
                setLoading(false)
                return false
            }else{
               let willRedirect =  removeUserClient();
               if(willRedirect){
                setRedirect(true)
               }
            }
        })

    }
  return (
    <>
    {
        redirect && (<Navigate to="/" />)
    }
    <div className="menu__container">
        <div className="menu__item" onClick={e=>setOpenForm(true)}>New Content</div>
        {location === "home" && (<Link to="/profile"><div className="menu__item">Profile</div></Link>)}
        {location === "profile" && (<Link to="/home"><div className="menu__item">Home</div></Link>)}
        <div className="menu__item" onClick={handleLogout}>Logout</div>
    </div>
    {
        openForm && (<Search setOpenSearch={setOpenForm} />)
    }
    {
        loading && (
            <div className="logging__out">Logging out...</div>
        )
    }
    </>
  )
}

export default Menu