import axios from 'axios';

export const getUser = (id,next) => {
    axios.get(`${process.env.REACT_APP_BACKEND}/user/${id}`).then(response=>{
        next(response.data)
        return response.data
    }).catch(e=>{
        next(e.response.data)
        console.log(e);
    })
}

export const search = (query,next) => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`).then(response=>{
        next(response.data)
    }).catch(e=>{
        next(e)
    })
}

export const addContnetInUser = (contentId,userId,token,next) => {
    axios.put(`${process.env.REACT_APP_BACKEND}/user/new/content/${userId}`,contentId,{
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