import React, { useContext, useEffect, useState } from 'react'
import ContentCard from '../Content/ContentCard'
import { ContentContext } from '../ContentContext'
import { SeparatedContext } from '../SeparatedContext'

const ShowSeparated = () => {
    const [separated,setSeparated] = useContext(SeparatedContext)
  return (
    <div className="allContents__wrapper">
        {
        separated.length === 0 && (
            <div className="AllContents__loading">Nothing found</div>
        )
        }
        {
            separated.length > 0 && separated.map((content,index) => (
                <ContentCard key={index} content={content.content} model={content.model} index={index} />
            ))
        }
    </div>
  )
}

export default ShowSeparated