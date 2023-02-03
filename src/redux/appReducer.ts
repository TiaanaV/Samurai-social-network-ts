import { actions } from './usersReducer';

import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const HAS_GLOBAL_ERROR = 'app/HAS_GLOBAL_ERROR';
const GLOBAL_ERROR_TEXT = 'app/GLOBAL_ERROR_TEXT';

let initialState = {
    initialized: false as boolean,
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

type ActionsTypes = InferActionsTypes<typeof actions>


export const actions = {
    initializedSuccess: () => ({type:'INITIALIZED_SUCCESS'}),
    globalErrorText:(errorText:null | string ) => ({type:'GLOBAL_ERROR_TEXT',payload:{errorText}}),
    // hasGlobalError: (globalError: string ) => ({type:'HAS_GLOBAL_ERROR',payload:{globalError}})

}


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