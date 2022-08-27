import React,{useState,createContext} from 'react'

export const ContentContext = createContext();

export const ContentProvider = props => {
    const [contents,setContents] = useState([])

  return (
    <ContentContext.Provider value={[contents,setContents]}>
        {props.children}
    </ContentContext.Provider>
  )
}
