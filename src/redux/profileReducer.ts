import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import {profileAPI} from "../api/profile-api";
import { PhotosType, PostsType, ProfileType } from "../types common/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


const ADD_POST='profilePage/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST'
const SAVE_PHOTO_SUCCESS ='profilePage/SAVE_PHOTO_SUCCESS';
const HAS_ERROR = 'profilePage/profile/HAS_ERROR';
const CLEAN_ERROR = 'profilePage/profile/CLEAN_ERROR ';

let initialState = {
    posts:[
        { id: 1, message: "Hi!", likeCount: 15 },
        { id: 2, message: "Yo!", likeCount: 45 },
        { id: 3, message: "Where are you?", likeCount: 55 },
      ] as Array<PostsType>,
      newPost:'',
      profile: null as ProfileType | null,
      status:"" ,
      error:null as string | null,
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState,action:ActionsTypes):InitialStateType => { 
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
            return {...state, profile:{...state.profile,photos:action.photos} as ProfileType,
            } 
        }
        case HAS_ERROR:{
            return{
                ...state,
                ...action.payload
            }
        }

        default:
            return state; 
        }
    }
        

   type ActionsTypes = InferActionsTypes<typeof actions>

   export const actions = {
    addPostActionCreator:(newPostText:string) => ({ type: ADD_POST,newPostText } as const),
    deletePost: (postId:number) => ({ type: DELETE_POST, postId} as const),
    setStatus: (status:string) => ({ type: SET_STATUS, status } as const),
    setUserProfile: (profile:ProfileType) => ({type:SET_USER_PROFILE,profile} as const),
    savePhotoSuccess:(photos:PhotosType) => ({type:SAVE_PHOTO_SUCCESS,photos} as const),
    hasError:(error:string|null) => ({type:HAS_ERROR,payload:{error}} as const),
   }
   type ThunkType = BaseThunkType<ActionsTypes| FormAction>

    export const getProfileInfo = (userId:number):ThunkType => async (dispatch) =>{
            let response = await profileAPI.getProfileInfo(userId) 
             //dispatch(getProfileInfo(response.data)) /// добавила getProfileInfo, возможно не нужно
            dispatch(actions.setUserProfile(response));
            };

    export const getStatus = (userId:number):ThunkType => async(dispatch ) =>{
        let response = await profileAPI.getStatus(userId)
           dispatch(actions.setStatus(response));
        }

    export const updateStatus = (status:string):ThunkType => async(dispatch) =>{
        try{
            let response = await profileAPI.updateStatus(status)
                 if(response.resultCode === ResultCodeEnum.Success){
                        dispatch(actions.setStatus(status));
                    }
         } 
         catch(error) {
            // let errorMessage = error.message;
            // if(/\d/g.test(errorMessage)){
            //     errorMessage="There was some unexpected error. We are already trying to fix it."
            // }
            // dispatch(actions.hasError(errorMessage))
            // setTimeout(() => dispatch(actions.hasError(null)),2000)
             }
        }
        
 export const savePhoto = (file:File):ThunkType => async(dispatch) =>{
        let response = await profileAPI.savePhoto(file)
            if(response.resultCode === ResultCodeEnum.Success){
                dispatch(actions.savePhotoSuccess(response.data.photos));
                }
         }

 export const saveProfile = (profile:ProfileType):ThunkType => async(dispatch,getState) =>{
        const userId = getState().auth.userId
        // const userId = 25786;
        let response = await profileAPI.saveProfile(profile);

                if(response.resultCode === ResultCodeEnum.Success){
                    if(userId != null){
                        dispatch(getProfileInfo(userId))
                    }else{
                        throw new Error('userId can`t be null')
                    }
                } else {
                    let errorType = response.messages[0];

                    if(errorType.includes(".")){
                        errorType.split(".",1);
                     } else if ( errorType.includes("Contacts->")){
                        errorType.split('(Contacts->').join(": ").split(')',1);
                    }
                    dispatch(stopSubmit("profile-edit",{_error: errorType}))
                    return Promise.reject(errorType)
                }
            }
        
         
    

export default profileReducer;  

