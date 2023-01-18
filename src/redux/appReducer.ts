import { getAuthUserData } from "./authReducer";


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const HAS_GLOBAL_ERROR = 'app/HAS_GLOBAL_ERROR';
const GLOBAL_ERROR_TEXT = 'app/GLOBAL_ERROR_TEXT';



let initialState = {
    initialized: false,
    globalError: null as null | string ,
    errorText:null as null | string
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState,action:any):InitialStateType => {
    switch(action.type){
        case INITIALIZED_SUCCESS:
            return{
                ...state,
                initialized:true
            };
        case HAS_GLOBAL_ERROR:
        case GLOBAL_ERROR_TEXT:
             return{
                ...state,
                ...action.payload
            };
            
       
            default:
                return state;
            }
}

type InitializedSuccessActionType = {
    type:typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type:INITIALIZED_SUCCESS});
type HasGlobalErrorActionPayloadType = {
    globalError: string
}
type HasGlobalErrorActionType = {
    payload: HasGlobalErrorActionPayloadType 
    type:typeof HAS_GLOBAL_ERROR
}
 const hasGlobalError = (globalError: string ):HasGlobalErrorActionType => ({type:HAS_GLOBAL_ERROR,payload:{globalError}});
const globalErrorText = (errorText:null | string ) => ({type:HAS_GLOBAL_ERROR,payload:{errorText}});

export const initializeApp = () => (dispatch:any) => {
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