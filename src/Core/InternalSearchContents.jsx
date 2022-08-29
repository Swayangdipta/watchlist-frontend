import React, { useEffect, useContext,useState } from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import ContentCard from '../Content/ContentCard'
import {SearchContext} from '../SearchContext'

const InternalSearchContents = () => {
  const [contents,setContents] = useContext(SearchContext)
  const {user} = isAuthenticated()

  return (
    <div className="allContents__wrapper">
      {
        contents.length === 0 && (
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

export default InternalSearchContents