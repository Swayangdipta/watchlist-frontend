import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getItemFromTmdb } from '../Content/helper/contentApiCalls'
import { getUser } from './helper/coreApiCalls'

const ViewUser = () => {
    const [userInfo,setUserInfo] = useState(undefined)
    const [contents,setContents] = useState([])
    const {userId} = useParams()

    const preload = () =>{
        getUser(userId,data=>{
            if(!data.error && data.name === 'AxiosError'){
                toast.error("Can not get user profile.Broken link maybe",{theme: 'dark'})
            }else{
                setUserInfo(data)
                console.log(data);
            }
        })
    }
    useEffect(()=>{
        preload()
    },[])

    useEffect(()=>{
        if(userInfo && userInfo.contents.length > 0){
            userInfo.contents.map(item => {
                getItemFromTmdb(item.type,item.imdb_id,data=>{
                    if(!data.error && data.name === 'AxiosError'){
                        toast.error("Faild to retrive data",{theme: 'dark'})
                    }else{
                        setContents(prev => [...prev,{model: item,content: data}])
                    }
                })
            })
        }
    },[userInfo])
  return (
    <div>{contents.map(item=>item.model.title)}</div>
  )
}

export default ViewUser