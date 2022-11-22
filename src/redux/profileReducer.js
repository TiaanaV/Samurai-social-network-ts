import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";


const ADD_POST='ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS ='SAVE_PHOTO_SUCCESS';

let initialState = {
    posts:[
        { id: 1, message: "Hi!", likeCount: 15 },
        { id: 2, message: "Yo!", likeCount: 45 },
        { id: 3, message: "Where are you?", likeCount: 55 },
      ],
      profile: null,
      status:"",
}

const profileReducer = (state = initialState,action) => {

    switch(action.type){
        case ADD_POST:{
            let newPost = {
            id:4,
            message: action.newPostText,
            likeCount:0
            };
            return {...state,
                posts:[...state.posts,newPost],
            };
        }
        case SET_USER_PROFILE:{
            return {...state, profile: action.profile,
            }
        }
        case DELETE_POST:{
            return {...state, posts: state.posts.filter(p => p.id!=action.postId),
            } 
        }
        case SET_STATUS:{
            return {...state, status: action.status,
            } 
        }
        case SAVE_PHOTO_SUCCESS:{
            return {...state, profile:{...state.profile,photos:action.photos},
            } 
        }

        default:
            return state;
        }
    }
    export const addPostActionCreator = (newPostText) => ({ type: ADD_POST,newPostText });
    export const deletePost = (postId) => ({ type: DELETE_POST, postId});
    export const setStatus = (status) => ({ type: SET_STATUS, status });
     const setUserProfile = (profile) => ({type:SET_USER_PROFILE,profile});
     const savePhotoSuccess =(photos) => ({type:SAVE_PHOTO_SUCCESS,photos});


    export const getProfileInfo = (userId) => {
        return (dispatch) =>{
            profileAPI.getProfileInfo(userId).then((data) => {
            dispatch(setUserProfile(data));
            });
        }
    }

    export const getStatus = (userId) => async(dispatch) =>{
        let response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data));
        }
    export const updateStatus = (status) => async(dispatch) =>{
        let response = await profileAPI.updateStatus(status)
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status));
                }
        }
    export const savePhoto = (file) => async(dispatch) =>{
         let response = await profileAPI.savePhoto(file)
                if(response.data.resultCode === 0){
                    dispatch(savePhotoSuccess(response.data.data.photos));
                }
         }

 export const saveProfile = (profile) => async(dispatch) =>{
        const userId = 25786;
        let response = await profileAPI.saveProfile(profile);

                if(response.data.resultCode === 0){
                   dispatch(getProfileInfo(userId))
                } else {
                    let errorType = response.data.messages[0];

                    if(errorType.includes(".")){
                        errorType = errorType.split(".",1);
                     } else if ( errorType.includes("Contacts->")){
                        errorType = errorType.split('(Contacts->').join(": ").split(')',1);
                    }

                    dispatch(stopSubmit("profile-edit",{_error: errorType}))
                    return Promise.reject(response.data.messages[0])
                }
            }
        
         
    

export default profileReducer;  