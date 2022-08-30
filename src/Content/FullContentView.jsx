import React, { useContext, useEffect,useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import {ImBin,ImPencil} from 'react-icons/im'
import { removeContent } from './helper/contentApiCalls'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { toast } from 'react-toastify'
import { ContentContext } from '../ContentContext'
import UpdateContentStatus from './UpdateContentStatus'

const FullContentView = ({content,model,status="Completed",setOpen=f=>f,reloadColor,setReloadColor=f=>f}) => {
    const [statusColor ,setStatusColor] = useState("Green");
    const [ratingColor ,setRatingColor] = useState({
        background: "#e91e63",
        color: "#222831"
    });
    const [isProcessing ,setIsProcessing] = useState(false);
    const [isUpdating ,setIsUpdating] = useState(false);
    const [contents,setContents] = useContext(ContentContext)

    const {user,token} = isAuthenticated()

    const preload = () => {
        switch (model.status) {
            case "Watching":
                setStatusColor("#2196f3")
                break;
            case "Pending":
                setStatusColor("#F7CD2E")
                break;
            case "Unfinished":
                setStatusColor("#E21717")
                break;
            default:
                setStatusColor("#4caf50")
                break;
        }

        if(content.vote_average >= 8){
            setRatingColor({
                background: "#59ff60",
                color: "#222831"
            })
        }else if(content.vote_average >= 5 && content.vote_average < 8){
            setRatingColor({
                background: "#cddc39",
                color: "#222831"
            })
        }
    }

    useEffect(()=>{
        preload()
    },[reloadColor])

    const handleRemove = e => {
        setIsProcessing(true)
        removeContent(model._id,user._id,token,(data)=>{
            if(data?.response?.data?.error){
                toast.error("Faild to remove content!",{theme: 'dark'});
                setIsProcessing(false)
            }else{
                toast.success("Content removed.",{theme: 'dark'})
                setContents(prevContents => prevContents.filter(item => {
                    return item.model._id !== model._id
                }))
                setOpen(false)
            }
        })
    }

  return (
    <div className='FullContentView__container'>
        <div className="FullContentView__wrapper">
            <i className="FullContentView__closeBtn" onClick={e=>setOpen(false)}><IoMdClose /></i>

            
            <div className="FullContentView__thumbnail__cover">
                <img style={{
                    borderRadius: '10px',
                    objectFit: 'cover',
                    filter: 'blur(5px)'
                }} src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} alt={`Probably an image of ${content.title}`} className="content__image"/>
            </div>
            <div className="FullContentView__thumbnail">
                <img style={{
                    borderRadius: '10px',
                    objectFit: 'contain'
                }} src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt={`Probably an image of ${content.title}`} className="content__image"/>
            </div>

            <div className="FullContentView__info__container">
                <div className="FullContentView__info__title"><h2>{content.original_name ? content.original_name : content.title ? content.title : content.name}</h2></div>

                <h2 className="FullContentView__info__other__title">Details</h2>

                <div className="FullContentView__info__link">
                    <p className='font_light text_20 color-white'>{content.overview}</p>
                </div> 

                {
                    content.homepage && (
                        <div className="FullContentView__info__link">
                            <h2>Link: <a href={content.homepage} className="font_light">{content.homepage}</a></h2>
                        </div>                        
                    )
                }
                <div className="FullContentView__info__link">
                    <h2>Status: 
                    <span className="content__card__status" style={{
                        position: 'relative',
                        top:'2px',
                        right: 'unset',
                        left: '10px',
                        display: 'inline-block'
                    }}>
                        <div style={{background: statusColor,boxShadow: `0px 0px 5px ${statusColor}`}} className="card__status__indicator"></div>
                        <p className="card__status font_light">{model.status}</p>
                    </span>
                    </h2>
                </div> 

                {
                    content.genres && content.genres.length > 0 && (
                        <div className="FullContentView__info__link">
                            <h2 className='flexIt'>Genres: {
                                content.genres.map((elm,index)=>{
                                    return <span key={index} className='color-white  FullContentView__info__category font_light'>{elm.name}</span>
                                })
                            }</h2>
                        </div>                        
                    )
                }


                <div className="FullContentView__info__link pb-40">
                    <h2 className='flexIt'>Rating: <span className='rating' style={{background: ratingColor.background}}>{content.vote_average}</span></h2>
                </div>

                <i className="FullContentView__info__modify" onClick={e=>setIsUpdating(true)}>{
                    isUpdating ? ("Updating...") : (<ImPencil />)
                }</i>
                <i className="FullContentView__info__modify FullContentView__info__remove" onClick={handleRemove}>{
                    isProcessing ? ("Removing...") : (<ImBin />)
                }</i>
            </div>
                {
                    isUpdating && (
                        <UpdateContentStatus setReloadColor={setReloadColor} content={model} setIsOpen={setIsUpdating} />
                    )
                }
        </div>
    </div>
  )
}

export default FullContentView