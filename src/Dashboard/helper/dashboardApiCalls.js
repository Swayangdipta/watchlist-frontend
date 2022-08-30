import axios from 'axios'

export const deleteAccount = (userId,token) => {
    return axios.delete(`${process.env.REACT_APP_BACKEND}/user/close/${userId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        return response.data
    }).catch(e=>{
        return e
    })
}