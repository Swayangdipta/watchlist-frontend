import axios from 'axios'

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false
    }
}

export const authenticate = data => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
    }
}

export const loginUser = (data,next) => {
    axios.post(`${process.env.REACT_APP_BACKEND}/login`,data).then(response=>{
        next(response.data)
        return response.data;
    }).catch(e => {
        next(e.response.data)
    })
}
export const registerUser = (data,next) => {
    axios.post(`${process.env.REACT_APP_BACKEND}/register`,data).then(response=>{
        next(response.data)
        return response.data;
    }).catch(e => {
        next(e.response.data)
    })
}

export const logoutUser = next => {
    axios.get(`${process.env.REACT_APP_BACKEND}/logout`).then(response=>{
        next(response.data)
        return response.data;
    }).catch(e => {
        next(e)
    })
}

export const removeUserClient = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        localStorage.removeItem("jwt")
        return true;
    }else{
        return false
    }
}