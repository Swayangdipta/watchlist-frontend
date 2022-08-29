import React, { useEffect, useContext,useState } from 'react'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import ContentCard from '../Content/ContentCard'
import { getItemFromTmdb, getUserContent } from '../Content/helper/contentApiCalls'
import {ContentContext} from '../ContentContext'
import { getUser } from './helper/coreApiCalls'

const AllContents = () => {
  const [contents,setContents] = useContext(ContentContext)
  const [contentsInfo,setContentsInfo] = useState([])
  const {user} = isAuthenticated()
  const preload = () => {
    getUser(user._id,(data)=>{
      if(!data.error){
        setContentsInfo(data.contents);
      }else{
        toast.error(data?.error,{theme: 'dark'});
      }
    })
  }

  useEffect(()=>{
      preload()
  },[])


  useEffect(()=>{
    if(!contentsInfo || contentsInfo.length > 0 && contents.length === 0){
      contentsInfo.map(elm=>{
        getItemFromTmdb(elm.type,elm.imdb_id,(data)=>{
          if(data.name == "AxiosError"){
            toast.error("Some error occured",{theme: 'dark'})
          }else{
            let toBeAddedContent = {
              model: elm,
              content: data
            }
            console.log(toBeAddedContent);
            setContents(prevContents => {
              return [...prevContents,toBeAddedContent]
            })
          }
        })
      })
    }
  },[contentsInfo])

  return (
    <div className="allContents__wrapper">
      {
        contentsInfo.length === 0 ? (
            <div className="AllContents__loading">Add Something</div>
        ) : contents.length === 0 && (
          <div className="AllContents__loading">Loading...</div>
        )
      }
        {
            contents.length > 0 && contents.map((content,index) => (
              <ContentCard key={index} content={content.content} model={content.model} index={index} />
            ))
        }
    </div>
  )
}

export default AllContents