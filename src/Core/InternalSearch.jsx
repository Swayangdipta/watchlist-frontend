import React, { useContext, useState } from 'react'
import { CgSearch } from 'react-icons/cg'
import { ContentContext } from '../ContentContext'
import { SearchContext } from '../SearchContext'


const InternalSearch = () => {
    const [value,setValue] = useState("")
    const [contents,setContents] = useContext(ContentContext)
    const [search,setSearch] = useContext(SearchContext)

    const handleSearch = e => {
        setSearch([])
        if(contents.length > 0){
            contents.map((element,index) => {
                if(element.model.title.toLowerCase().includes(e.target.value.toLowerCase())){
                    setSearch(prevResult => [...prevResult,element])
                }
            });
        }
    }

  return (
    <div className='internalSearch'>
        <form className='internalSearch_Form'>
            <input onChange={handleSearch} type="text" name="search" id="search" className='search_input internalSearch_input' placeholder='Search your collection...' />
            <CgSearch className='search__icon_pl search__icon_internal'/>
        </form>
    </div>
  )
}

export default InternalSearch