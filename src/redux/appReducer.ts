
import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const HAS_GLOBAL_ERROR = 'app/HAS_GLOBAL_ERROR';
const GLOBAL_ERROR_TEXT = 'app/GLOBAL_ERROR_TEXT';

let initialState = {
    initialized: false,
    globalError: null as null | string ,
    errorText:null as null | string
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState,action:ActionsTypes):InitialStateType => {
    switch(action.type){
        case INITIALIZED_SUCCESS:
            return{
                ...state,
                initialized:true
            };
        // case HAS_GLOBAL_ERROR:
        case GLOBAL_ERROR_TEXT:
             return{
                ...state,
                ...action.payload
            };
            
       
            default:
                return state;
            }
}

type ActionsTypes = InitializedSuccessActionType | GlobalErrorTextActionType

type InitializedSuccessActionType = {
    type:typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type:INITIALIZED_SUCCESS});

// type HasGlobalErrorActionType = {
//     payload:{globalError: string}
//     type:typeof HAS_GLOBAL_ERROR
// }
//  const hasGlobalError = (globalError: string ):HasGlobalErrorActionType => ({type:HAS_GLOBAL_ERROR,payload:{globalError}});

type GlobalErrorTextActionType = {
        payload: {errorText:null | string}
       type:typeof GLOBAL_ERROR_TEXT
}

const globalErrorText = (errorText:null | string ):GlobalErrorTextActionType => ({type:GLOBAL_ERROR_TEXT,payload:{errorText}});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes >

export const initializeApp = ():ThunkType => (dispatch,getState) => {
    let promise = dispatch(getAuthUserData());
 Promise.all([promise])
    .then(() => {
        dispatch(initializedSuccess())
        });
    };

    // export const checkGlobalError = (reason,promiseRejectionEvent) => (dispatch) => {
    //      dispatch(hasGlobalError(reason));
    //      dispatch(globalErrorText(promiseRejectionEvent));
    // }


export default appReducer;