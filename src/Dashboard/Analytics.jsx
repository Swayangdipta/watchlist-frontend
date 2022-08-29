import React, { useContext, useEffect, useState } from 'react'
import { ContentContext } from '../ContentContext'

const Analytics = () => {
    const [contents,setContents] = useContext(ContentContext)
    const [totalWatchTime,setTotalWatchTime] = useState(0)
    const [timeInHours,setTimeInHours] = useState(0)
    const [remMin,setRemMin] = useState(0)
    const [timeInDays,setTimeInDays] = useState(0)

    useEffect(()=>{
        setTotalWatchTime(0)
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
                }else{
                    setTotalWatchTime(prev => prev + (elm.content.runtime - 4))
                }
            })
        }
    },[contents])

    useEffect(()=>{
        setTimeInHours(0)
        setRemMin(0)
        setTimeInDays(0)
        // if(totalWatchTime > 1439){
        //     let days = Math.floor(totalWatchTime/60/24)
        //     let hour = Math.floor(totalWatchTime / 60 % 24)
        //     let remainingMinutes = totalWatchTime % 60
        //     setTimeInHours(hour)
        //     setRemMin(remainingMinutes)
        //     setTimeInDays(days)
        // }else 3
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
        if(timeInHours > 0){
            const obj = document.getElementById("value2");
            animateValue(obj, 0, timeInHours, 4000);            
        }
    },[timeInHours])

  return (
    <div className="analytics">
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
    </div>
  )
}

export default Analytics