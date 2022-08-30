import React, { useContext, useEffect, useState } from 'react'
import ContentCreateButton from '../Content/ContentCreateButton'
import { SearchContext } from '../SearchContext';
import { SeparatedContext } from '../SeparatedContext';
import { ContentContext } from '../ContentContext';
import AllContents from './AllContents';
import Header from './Header'
import InternalSearchContents from './InternalSearchContents';
import ShowSeparated from './ShowSeparated';
import SubHeader from './SubHeader';
import { isAuthenticated } from '../Auth/helper/authApiCalls';
import { Navigate } from 'react-router-dom';

const Base = () => {
  const [whichToShow,setWhichToShow] = useState("all")
  const [contents,setContents] = useContext(ContentContext)
  const [search,setSearch] = useContext(SearchContext)
  const [separated,setSeparated] = useContext(SeparatedContext)


  useEffect(()=>{
    setSeparated([])
    if(whichToShow !== "all" && whichToShow !== "search"  && contents.length > 0){
        contents.map(item=> {
          if(whichToShow === "tv" || whichToShow === "movie"){
            if(item.model.type === whichToShow){
              setSeparated(prev => [...prev,item])
            }
          }else{
            if(item.model.status === whichToShow){
              setSeparated(prev => [...prev,item])
            }
          }
        })
    }
  },[whichToShow,contents])

  useEffect(()=>{
    if(search.length > 0) {
      setWhichToShow("search")
    }
  },[search])
  return (
    isAuthenticated() ? (
      <div>
          <Header/>
          <SubHeader whichToShow={setWhichToShow} />
          {
            whichToShow === "all" ? (<AllContents />) : 
            whichToShow === "search" ? (<InternalSearchContents />) : (<ShowSeparated  />)
          }
          <ContentCreateButton />
      </div>      
    ) : (<Navigate to="/" />)
  )
}

export default Base