import React , {useState,useContext} from 'react'
import { CgSearch } from 'react-icons/cg'
import { AiOutlineStar,AiFillCloseCircle } from 'react-icons/ai'
import { SiAddthis } from 'react-icons/si'
import { search, addContnetInUser } from './helper/coreApiCalls'
import { addContentDefault, getItemFromTmdb } from '../Content/helper/contentApiCalls'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import { toast } from 'react-toastify'
import { ContentContext } from '../ContentContext'

const Search = ({setOpenSearch=f=>f}) => {
    const [contents,setContents] = useContext(ContentContext)
    const [results,setResults] = useState([])
    const [value,setValues] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()

    const handleSearch = e => {
        setValues(e.target.value)
        if(e.target.value !== ""){
            search(e.target.value,(data)=>{
                setResults(data.results)
            })            
        }
    }

    const addContent = item => {
        setIsLoading(true)
        let content = {
            title: item.title ? item.title : item.name ? item.name : item.original_name,
            type: item.media_type,
            imdb_id: item.id
        }

        addContentDefault(content,user._id,token,(data)=>{
            if(data.name == "AxiosError" || data.error){
                if(data.response.data.error){
                    toast.error(data.response.data.error,{theme: "dark"})
                    setIsLoading(false) 
                }else{
                    toast.error("Something went wrong. Try again",{theme: "dark"})
                    console.log(data);
                    setIsLoading(false)                    
                }

            }else{
                addContnetInUser({_id: data._id},user._id,token,(res)=>{
                    if(data.name == "AxiosError" || data.error){
                        toast.error("Faild to add to your collection",{theme: "dark"})
                        console.log(data);
                        setIsLoading(false)
                    }else{
                        toast.success("Added to your collection",{theme: "dark"})
                        getItemFromTmdb(item.media_type,item.id,(elem)=>{
                            addContentInContext(elem,data)
                            setOpenSearch(false)
                            setIsLoading(false)                            
                        })

                    }
                })
            }
        })
    }

    const addContentInContext = (elm,data) => {
        let newContent = {
            content: elm,
            model: data
        }
        setContents(prevContents => {
            return [...prevContents,newContent]
        })
    }
  return (
    <div className='search_wrapper'>
        <div className='closeSearch'><AiFillCloseCircle className='closeSearchIcon' onClick={e=>setOpenSearch(false)} /></div>
        <div className='search__container'>
            {
                isLoading && (<div className='contentAdding'>Adding to you collection...</div>)
            }
            <form className='searchForm'>
                <input autoFocus value={value} onChange={handleSearch} type="text" name="search" id="search" className='search_input' placeholder='Search tv,movie...' />
                <CgSearch className='search__icon_pl'/>
            </form>

            <div className='search__results'>
                {
                    results.length > 0 ? (
                        <div className='result__items'>
                            {
                            results.map((item,index)=>(
                                item.poster_path && (
                                    <div key={index} className="result__item">
                                        <img className='search_img' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                        <div className='search_info'>
                                            <h2 className='search_title'>{item.title ? item.title : item.name}</h2>
                                            <p className='search_overview'>{item.overview}</p>
                                            <div className='ratings_info'>
                                                <div className='actual_type'>
                                                    {item.media_type}
                                                </div>
                                                |
                                                <div className='actual_rating'>
                                                    <AiOutlineStar/> {item.vote_average}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='add_content'>
                                            <SiAddthis onClick={e=>addContent(item)} />
                                        </div>
                                        <div></div>
                                    </div>   
                                )
                            ))
                            }
                        </div>
                    ) 
                    : (<div className='no__result'>No results...</div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Search