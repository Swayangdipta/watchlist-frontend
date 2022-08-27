import React, { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { ContentContext } from '../ContentContext'
import { getItemFromTmdb, updateContent } from './helper/contentApiCalls'


const UpdateContentStatus = ({content,setIsOpen=f=>f,setReloadColor=f=>f}) => {
    const [contents,setContents] = useContext(ContentContext)
    const [statuses,setStatuses] = useState([
        "Watching",
        "Pending",
        "Unfinished",
        "Completed"
    ])

    const [newStatus,setNewStatus] = useState(content.status)
    const [isUpdating,setIsUpdating] = useState(false)
    const {user,token} = isAuthenticated()

    const handleUpdate = e => {
        e.preventDefault()
        setIsUpdating(true)

        let newContent = {
            _id: content._id,
            status: newStatus
        }

        updateContent(content._id,user._id,token,newContent,(data)=>{
            if(data?.response?.data?.error){
                toast.error(data?.response?.data?.error,{theme: 'dark'})
            }else if(data.name == "AxiosError"){
                toast.error("Something went wrong :(",{theme: 'dark'})
            }else{
                getItemFromTmdb(data.type,data.imdb_id,(elem)=>{
                    setContents(prev => {
                        let items = []
                        prev.map(item=>{
                            if(item.model._id === content._id){
                                item.model.status = newStatus
                                items.push(item)
                            }else{
                                items.push(item)
                            }
                        })
                        return items
                    })
                })
                toast.success("Status updated :)",{theme: 'dark'})
                setIsUpdating(false)
                setReloadColor(prev => prev+1)
                setIsOpen(false)
            }
        })
    }

  return (
    <div className="updateContent__container">
        <div className='updateStatusForm__wrapper'>
            <div className='update__header'>
                <h2 className="update_title">Update</h2>
                <div className='closeSearch closeUpdate'><AiFillCloseCircle className='closeSearchIcon' onClick={e=>setIsOpen(false)} /></div>
            </div>
            <h3 className="updateContent__title">
                {content.title}
            </h3>
            <form className='updateStatusForm' >
                <label htmlFor="select" className='updateContent__label'>Status</label>
                <select value={newStatus} name="select" id="select" onChange={e=>setNewStatus(e.target.value)}>
                    <option value={content.status}>{content.status}</option>
                    {
                        statuses.map((elm,index)=>(
                            elm !== content.status && (
                                <option key={index} value={elm}>{elm}</option>                           
                            )

                        ))
                    }
                </select>

                <button disabled={isUpdating ? true : false} className="upadteStatusBtn" onClick={handleUpdate}>{isUpdating ? ("Updating...") : ("Update")}</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateContentStatus