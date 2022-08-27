import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {BiLinkExternal} from 'react-icons/bi'
import FullContentView from './FullContentView';


const ContentCard = ({content,model,status="Completed",index}) => {

    const [statusColor ,setStatusColor] = useState("Green");
    const [isEditOpen ,setIsEditOpen] = useState(false);
    const [reloadColor,setReloadColor] = useState(0)

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
    }

    useEffect(()=>{
        preload()
    },[reloadColor])

  return (
    <>
        <div onClick={e=>setIsEditOpen(true)} className='content__card__wrapper' >
            <div className="content__card__status">
                <div style={{background: statusColor,boxShadow: `0px 0px 12px ${statusColor},0px 0px 0px 7px #191a1c`}} className="card__status__indicator"></div>
            </div>
            <img src={`https://image.tmdb.org/t/p/w500/${content?.poster_path}`} alt={content?.title} className="content__image" />
            <p className="content__title">{content?.name ? content?.name : model?.title}</p>
        </div>
        {
            isEditOpen && (<FullContentView reloadColor={reloadColor} setReloadColor={setReloadColor} model={model} content={content} status={status} setOpen={setIsEditOpen} />)
        }
    </>
  )
}

export default ContentCard