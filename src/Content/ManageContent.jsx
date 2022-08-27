import React, { useContext, useEffect, useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {toast} from 'react-toastify'
import {BiLoaderCircle} from 'react-icons/bi'
// import { editContent } from './helper/contentApiCalls'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { ContentContext } from '../ContentContext'


const ManageContent = ({content,setIsEditOpen=f=>f}) => {
  const [inputs,setInputs] = useState({
    title: content.title,
    link: content?.link ? content.link : '',
    user: content.user,
    category: content?.category ? content.category : '',
    status: content.status,
    photo: `${process.env.REACT_APP_BACKEND}/content/photo/${content._id}`,
    url: `${process.env.REACT_APP_BACKEND}/content/photo/${content._id}`,
    formData: new FormData()
})

const [isLoading,setIsLoading] = useState(false);
const [contents,setContents] = useContext(ContentContext)
const {user,token} = isAuthenticated();

const allStatus = ['Finished','Watching','Pending','Unfinished'];
const allCategories = ['Film','Web Series','Anime','Cartoon','Book','Manga','Comics','Others'];
const {status,category,url,formData,title,link} = inputs

const handleChange = input =>  e => {
    formData.append("user","swayangdiptacc@gmail.com")
    if(input !== 'photo'){
        setInputs({...inputs,[input]: e.target.value});
        formData.append(input,e.target.value);
    }else{
        setInputs({...inputs,[input]: e.target.file,url: URL.createObjectURL(e.target.files[0])});
        formData.append(input,e.target.files[0])
    }
}

const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    // editContent(formData,user._id,token,content._id,(data) => {
    //   if(!data?.response?.data?.error){
    //       toast.success("Content Updated.Refresh the page.",{theme: 'dark'})
    //       setIsEditOpen(false)
    //       setContents(prevContents => {
    //         const newState = prevContents.map(item => {
    //             if(item._id === content._id){
    //                 return data
    //             }
    //             return item
    //           })

    //           return newState
    //       })
    //   }else{
    //       toast.error("Faild to update! Try later.",{theme: 'dark'})
    //   }
    // })

    setIsLoading(false)
}


  return (
    <div className="content__form__container">
        <div className='content__form__wrapper'>
            <div className="content__form__kinda__header"></div>
            <h2 className="create__content__title">Edit {content.category}</h2>
            <i className="content__close__form" onClick={e=> setIsEditOpen(false)}><IoMdClose/></i>
            <form className="content__form">
                <label htmlFor="title" className="content__label">Title <span className="color__red">*</span></label>
                <input type="text" name="title" className="content__inputs" value={title} placeholder='Enter title here' onChange={e=>handleChange('title')(e)}/>

                <label htmlFor="status" className="content__label">Status <span className="color__red">*</span></label>
                <select name="status" className="content__inputs" value={status} onChange={e=>handleChange('status')(e)}>
                    <option className="content__options">Finished</option>
                    {
                        allStatus.map((indiStatus,index)=>(
                            <option key={index} value={indiStatus} className="content__options">{indiStatus}</option>
                        ))
                    }
                </select>
                </form>
       
                <label htmlFor="category" className="content__label">Category <span className="color__red">*</span></label>
                <select name="category" className="content__inputs" value={category} onChange={e=>handleChange('category')(e)}>
                    <option className="content__options">Film</option>
                    {
                        allCategories.map((indiStatus,index)=>(
                            <option key={index}  value={indiStatus} className="content__options">{indiStatus}</option>
                        ))
                    }
                </select>
                <label htmlFor="link" className="content__label">Link <span className="color__red">*</span></label>
                <input type="text" name="link" className="content__inputs" value={link} placeholder='Ex. IMDB link' onChange={e=>handleChange('link')(e)} />
                
                <label htmlFor="link" className="content__label">Image <span className="color__red">*</span></label>
                <div className="content__image__input__wrapper">
                    <div className='content__photo__input'>
                        <input className='pointer__cursor' onChange={e=>handleChange("photo")(e)} type="file" name="" id="" />
                    </div>
                    <div className="content__previewImage">
                        {
                            url !== '' ?  (
                                <img src={url} alt="" className="preview" />
                            ) : ('')
                        }
                    </div>
                </div>
                <button onClick={handleSubmit} type="submit" className='content__submit__btn pointer__cursor'>{
                    isLoading ? "Updating.." : "Update"
                }</button>
        </div>
    </div>
  )
}

export default ManageContent