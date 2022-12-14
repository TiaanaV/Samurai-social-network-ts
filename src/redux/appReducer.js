import { getAuthUserData } from "./authReducer";


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const HAS_GLOBAL_ERROR = 'app/HAS_GLOBAL_ERROR';
const GLOBAL_ERROR_TEXT = 'app/GLOBAL_ERROR_TEXT';

let initialState = {
    initialized: false,
    globalError:null,
    errorText:null,
}
const appReducer = (state = initialState,action) => {
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


export const initializedSuccess = () => ({type:INITIALIZED_SUCCESS});
 const hasGlobalError = (globalError) => ({type:HAS_GLOBAL_ERROR,payload:{globalError}});
const globalErrorText = (errorText) => ({type:HAS_GLOBAL_ERROR,payload:{errorText}});

export const initializeApp = () => (dispatch) => {
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