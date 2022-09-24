import * as axios from "axios";
import { login } from "../redux/authReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "90f162c3-67da-435f-84ba-4af89102403f"},  
});

export const usersAPI = { 
    getUsers(currentPage=1,pageSize=10){
    return instance.get(
        `users?page=${currentPage}&count=${pageSize}`
      )
      .then(response => {
        return response.data;
      })
    },

    unfollow(id){
      return instance.delete(`follow/${id}`)
      .then(response => {
        return response.data;
      })
    },

    follow(id){
        return instance.post(`follow/${id}`)
          .then(response => { 
            return response.data;
          });
    },
}

export const authAPI = {
    authMe(){ 
        return instance.get(`auth/me`).then(response => {
        return response.data;
      })
    },
    login(email,password,rememberMe= false){
      return instance.post(`auth/login`,{email,password,rememberMe})
    },
    logout(){
      return instance.delete(`auth/login`)
    }
}

export const profileAPI = {
    getProfileInfo(userId){ 
        return instance.get(`profile/` + userId).then(response => {
            return response.data;
          });
    },
    getStatus(userId){
      return instance.get(`profile/status/`+ userId)
    },
    updateStatus(status){
      return instance.put(`profile/status`,{status:status})

    },
}
