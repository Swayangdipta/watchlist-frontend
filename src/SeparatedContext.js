import React,{useState,createContext} from 'react'

export const SeparatedContext = createContext();

export const SeparatedProvider = props => {
    const [search,setSearch] = useState([])

  return (
    <SeparatedContext.Provider value={[search,setSearch]}>
        {props.children}
    </SeparatedContext.Provider>
  )
}