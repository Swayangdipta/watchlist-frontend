import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ContentCard from '../Content/ContentCard'
import { getItemFromTmdb } from '../Content/helper/contentApiCalls'
import Analytics from '../Dashboard/Analytics'
import { getUser } from './helper/coreApiCalls'

const ViewUser = () => {
    const [userInfo,setUserInfo] = useState(undefined)
    const [contents,setContents] = useState([])
    const {userId} = useParams()

    const [totalWatchTime,setTotalWatchTime] = useState(0)
    const [totalEpisodes,setTotalEpisodes] = useState(0)
    const [timeInHours,setTimeInHours] = useState(0)
    const [remMin,setRemMin] = useState(0)
    const [timeInDays,setTimeInDays] = useState(0)

    useEffect(()=>{
        setTotalWatchTime(0)
        setTotalEpisodes(0)
        let averageTime = 0;
        if(contents.length > 0) {
            contents.map(elm => {
                if(elm.model.type === "tv"){
                    if(elm.content.episode_run_time.length > 1){
                        elm.content.episode_run_time.map(time => {
                            averageTime += time
                        })
                        averageTime = averageTime/elm.content.episode_run_time.length
                        setTotalWatchTime(prev => prev + ((averageTime * elm.content.number_of_episodes) - 4) )
                        averageTime = 0
                    }else{
                        setTotalWatchTime(prev => prev + ((elm.content.episode_run_time[0] * elm.content.number_of_episodes) - 4) )
                    }
                    setTotalEpisodes(prev => prev+elm.content.number_of_episodes)
                }else{
                    setTotalWatchTime(prev => prev + (elm.content.runtime - 4))
                    setTotalEpisodes(prev => prev+1)
                }
            })
        }
    },[contents])

    useEffect(()=>{
        setTimeInHours(0)
        setRemMin(0)
        setTimeInDays(0)
        if(totalWatchTime > 60){
            let hour = Math.floor(totalWatchTime/60)
            let remainingMinutes = totalWatchTime % 60
            setTimeInHours(hour)
            setRemMin(remainingMinutes)
        }else{
            setRemMin(totalWatchTime)
        }
    },[totalWatchTime])

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
    }
      
    useEffect(()=>{
        if(contents.length > 0){
            const obj = document.getElementById("value0");
            animateValue(obj, 0, contents.length, 3000);            
        }
    },[contents.length])

    useEffect(()=>{
        if(timeInHours > 0){
            const obj = document.getElementById("value2");
            animateValue(obj, 0, timeInHours, 5000);            
        }
    },[timeInHours])

    useEffect(()=>{
        if(totalEpisodes > 0){
            const obj = document.getElementById("value3");
            animateValue(obj, 0, totalEpisodes, 5000);            
        }
    },[totalEpisodes])

    const preload = () =>{
        getUser(userId,data=>{
            if(!data.error && data.name === 'AxiosError'){
                toast.error("Can not get user profile.Broken link maybe",{theme: 'dark'})
            }else{
                setUserInfo(data)
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
    <div>
        <div className="viewUserHeader">
            <h1 className="viewUserName">{userInfo?.name}</h1>
        </div>
        <div style={{marginTop: '100px'}} className="analytics">
        <div className='watchtime watchtimeVw'>
            <div className='watchTime__title'>
                <div>Viewed</div>
            </div>
            <div className="watchTimeCircle watchTimeCircleVw"></div>
            <div className='watchTime__times watchTime__episodes'>
                <div  id='value0'>{contents.length}</div>
                <div>Contents</div>
            </div>
        </div> 

        <div className='watchtime'>
            <div className='watchTime__title'>
                <div>Watch</div>
                <div>Time</div>
            </div>
            <div className="watchTimeCircle"></div>
            <div className='watchTime__times'>
                <div  id='value2'>{timeInHours}</div>
                <div>Hours</div>
            </div>
        </div>        

        <div className='watchtime watchtimeEp'>
            <div className='watchTime__title'>
                <div>Total</div>
            </div>
            <div className="watchTimeCircle watchTimeCircleEp"></div>
            <div className='watchTime__times watchTime__episodes'>
                <div  id='value3'>{totalEpisodes}</div>
                <div>Episodes</div>
            </div>
        </div>             
    
        </div>

        <div className="allContents__wrapper">
      {
        contents.length === 0 && (
          <div className="AllContents__loading">Loading...</div>
        )
      }
        {
            contents.length > 0 && contents.map((content,index) => (
              <ContentCard location="share" key={index} content={content.content} model={content.model} index={index} />
            ))
        }
    </div>
    </div>
  )
}

export default ViewUser