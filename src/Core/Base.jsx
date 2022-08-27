import React, { useContext, useEffect, useState } from 'react'
import ContentCreateButton from '../Content/ContentCreateButton'
import { SearchContext } from '../SearchContext';
import AllContents from './AllContents';
import Header from './Header'
import InternalSearchContents from './InternalSearchContents';
import SubHeader from './SubHeader';

const Base = () => {
  const [whichToShow,setWhichToShow] = useState("all")
  const [search,setSearch] = useContext(SearchContext)

  useEffect(()=>{
    if(search.length > 0) {
      setWhichToShow("search")
    }
  },[search])
  return (
    <div>
        <Header/>
        <SubHeader whichToShow={setWhichToShow} />
        {
          whichToShow === "all" ? (<AllContents />) : (<InternalSearchContents />)
        }
        <ContentCreateButton />
    </div>
  )
}

export default Base