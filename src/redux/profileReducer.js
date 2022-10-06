import { profileAPI } from "../api/api";

const ADD_POST='ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'

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

        default:
            return state;
        }
    }
    export const addPostActionCreator = (newPostText) => ({ type: ADD_POST,newPostText });
    export const deletePost = (postId) => ({ type: DELETE_POST, postId});
    export const setStatus = (status) => ({ type: SET_STATUS, status });
     const setUserProfile = (profile) => ({type:SET_USER_PROFILE,profile});
    export const getProfileInfo = (userId) => {
        return (dispatch) =>{
            profileAPI.getProfileInfo(userId).then((data) => {
            dispatch(setUserProfile(data));
            });
        }
    }

    export const getStatus = (userId) => (dispatch) =>{
            profileAPI.getStatus(userId)
            .then((response) => {
            dispatch(setStatus(response.data));
            });
        }
    export const updateStatus = (status) => (dispatch) =>{
            profileAPI.updateStatus(status)
            .then((response) => {
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status));
                }
            });
        }

export default profileReducer;  