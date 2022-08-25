const ADD_POST='ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts:[
        { id: 1, message: "Hi!", likeCount: 15 },
        { id: 2, message: "Yo!", likeCount: 45 },
        { id: 3, message: "Where are you?", likeCount: 55 },
      ],
      newPostText:"",
}

const profileReducer = (state = initialState,action) => {

    switch(action.type){
        case ADD_POST:{
            let newPost = {
            id:4,
            message: state.newPostText,
            likeCount:0
            };
            return {...state,
                posts:[...state.posts,newPost],
                newPostText:"",
            };
        }
        case UPDATE_NEW_POST_TEXT:{
            return {...state,
                newPostText:action.newText,
            };
        }
        default:
            return state;
        }
    }
    export const addPostActionCreator = () => ({ type: ADD_POST });
    export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export default profileReducer;  