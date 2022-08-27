import axios from 'axios';

export const addContentDefault = (formData,userId,token,next) => {
    axios.post(`${process.env.REACT_APP_BACKEND}/upload/${userId}`,formData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        next(response.data)
        return response.data
    }).catch(e=>{
        next(e)
    })
}

export const getItemFromTmdb = (type,id,next) => {
    axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`).then(response=>{
        next(response.data)
        return response.data
    }).catch(e => {
        next(e)
        return e
    })
}

export const removeContent = (contentId,userId,token,next) => {
    axios.delete(`${process.env.REACT_APP_BACKEND}/remove/${contentId}/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        next(response.data)
        return response.data
    }).catch(e=>{
        next(e)
        return e;
    })
}

export const updateContent = (contentId,userId,token,content,next) => {
    axios.put(`${process.env.REACT_APP_BACKEND}/edit/${contentId}/${userId}`,content,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        next(response?.data)
        return response?.data
    }).catch(e=>{
        next(e)
        return e;
    })
}