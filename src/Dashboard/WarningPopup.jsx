import React, { useState } from 'react'
import {MdOutlineClose} from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isAuthenticated, removeUserClient } from '../Auth/helper/authApiCalls'
import { deleteAccount } from './helper/dashboardApiCalls'


const WarningPopup = ({setWarning=f=>f}) => {
    const [redirect,setRedirect] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()

    const handleDelete = e => {
        setIsLoading(true)
        deleteAccount(user._id,token).then(data=>{
            if(!data.error || data.name !== 'AxiosError'){
                toast.success("Account deleted. Redirecting",{theme: 'dark'})
                removeUserClient()
                setRedirect(true)
                setIsLoading(false)
            }else{
                toast.error("Faild to delete account.",{theme: 'dark'})
                setIsLoading(false)
            }
        }).catch(e=>{
            toast.error("Faild to delete account.",{theme: 'dark'})
            console.log(e);
            setIsLoading(false)
        })
    }
  return (
    <div className="warningPopup__container">
        {
            redirect && <Navigate to="/" />
        }
        <div className='warningPopup'>
            <h1 className="warningTitle">Warning</h1>
            <p className='warningInfo'>
                This action will delete your account and all the data.
                You will not be able to recover any of the data or the account.
            </p>
            <button className="confirmDeleteBtn" onClick={handleDelete}>{isLoading ? ("Deleting...") : ("Delete Anyway")}</button>
            <div className='warningClose' onClick={e=>setWarning(false)}><MdOutlineClose /></div>
        </div>        
    </div>

  )
}

export default WarningPopup