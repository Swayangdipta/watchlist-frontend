import React, { useContext } from 'react'
import { ContentContext } from '../ContentContext'

const TotalCount = ({whichToShow=f=>f}) => {

    const [contents,setContents] = useContext(ContentContext)

  return (
    <div className='totalContents' onClick={e=>whichToShow("all")}>
        <div className="content__count">Watched: {contents.length}</div>
    </div>
  )
}

export default TotalCount