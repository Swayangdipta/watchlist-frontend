import React, { useContext, useState } from 'react'
import { ContentContext } from '../ContentContext'
import {MdOutlineClose} from 'react-icons/md'
import {AiOutlineSmallDash} from 'react-icons/ai'
import { removeContent } from '../Content/helper/contentApiCalls'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { toast } from 'react-toastify'


const ProfileContents = () => {
    const [contents,setContents] = useContext(ContentContext)
    const {user,token} = isAuthenticated()
    const [isLoading,setIsLoading] = useState(false)

    const handleClick = element => {
        setIsLoading(true)
        removeContent(element,user._id,token,(data)=>{
            if(data?.response?.data?.error){
                toast.error("Faild to remove content!",{theme: 'dark'});
                setIsLoading(false)
            }else{
                toast.success("Content removed.",{theme: 'dark'})
                setContents(prevContents => prevContents.filter(item => {
                    return item.model._id !== element
                }))
                setIsLoading(false)
            }
        })
    }
  return (
    <div className='profile__contents'>
        <h2 className="profile__section__title">Your Collection</h2>
        <div className="profile__contents__wrapper">
            {
                contents.map((item,index)=>(
                    <div key={index} className="profile__content">
                        <h3 className="profile__content__title">{item.model.title}</h3>
                        <div className="profile__content__btn" onClick={e => !isLoading && handleClick(item.model._id)}>
                            {
                                isLoading ? (<AiOutlineSmallDash />) : (<MdOutlineClose />)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default ProfileContents