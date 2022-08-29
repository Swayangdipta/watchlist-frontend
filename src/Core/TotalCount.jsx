import React, { useContext, useEffect, useState } from 'react'
import { ContentContext } from '../ContentContext'

const TotalCount = ({whichToShow=f=>f}) => {

    const [contents,setContents] = useContext(ContentContext)

    const [completed,setCompleted] = useState(0);
    const [pending,setPending] = useState(0);
    const [unfinished,setUnfinished] = useState(0);
    const [watching,setWatching] = useState(0);
    const [series,setSeries] = useState(0);
    const [movie,setMovie] = useState(0);

    useEffect(()=>{
      setCompleted(0)
      setPending(0)
      setUnfinished(0)
      setWatching(0)
      setSeries(0)
      setMovie(0)
      if(contents.length > 0) {
        contents.map(element => {
          if(element.model.type == 'tv'){
            setSeries(prev => prev+1)
          }else{
            setMovie(prev => prev+1)
          }

          if(element.model.status == 'Watching'){
            setWatching(prev => prev+1)
          }else if(element.model.status == 'Unfinished'){
            setUnfinished(prev => prev+1)
          }else if(element.model.status == 'Pending'){
            setPending(prev => prev+1)
          }else{
            setCompleted(prev => prev+1)
          }
        });
      }
    },[contents])

    const handleClick = item => {
      whichToShow(item)
    }

  return (
    <div className='totalContents'>
        <div className="content__count" onClick={e=>handleClick("all")}>All: {contents.length}</div>
        
        <div className="content__count completed" onClick={e=>handleClick("Completed")}>Completed: {completed}</div>
        <div className="content__count watching" onClick={e=>handleClick("Watching")}>Watching: {watching}</div>
        {
          unfinished > 0 && (<div className="content__count unfinished" onClick={e=>handleClick("Unfinished")}>Unfinished: {unfinished}</div>)
        }
        {
          pending > 0 && (<div className="content__count pending" onClick={e=>handleClick("Pending")}>Pending: {pending}</div>)
        }
        <div className="content__count" onClick={e=>handleClick("tv")}>Series: {series}</div>
        <div className="content__count" onClick={e=>handleClick("movie")}>Movie: {movie}</div>
    </div>
  )
}

export default TotalCount