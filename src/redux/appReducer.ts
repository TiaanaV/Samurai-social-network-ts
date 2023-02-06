
import { getAuthUserData } from "./authReducer";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false as boolean,
    globalError: null as null | string ,
    errorText:null as null | string
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState,action:ActionsTypes):InitialStateType => {
    switch(action.type){
        case 'INITIALIZED_SUCCESS':
            return{
                ...state,
                initialized:true
            };
        // case HAS_GLOBAL_ERROR:
        // case 'GLOBAL_ERROR_TEXT':
        //      return{
        //         ...state,
        //         ...action.errorText
        //     };
            
       
            default:
                return state;
            }
}


export const actions = {
    initializedSuccess: () => ({type:'INITIALIZED_SUCCESS'} as const),
    // globalErrorText:(errorText:null | string ) => ({type:'GLOBAL_ERROR_TEXT',payload:{errorText}} as const),
    // hasGlobalError: (globalError: string ) => ({type:'HAS_GLOBAL_ERROR',payload:{globalError}})

}


type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
 Promise.all([promise])
    .then(() => {
        dispatch(actions.initializedSuccess())
        });
    };

    // export const checkGlobalError = (reason,promiseRejectionEvent) => (dispatch) => {
    //      dispatch(hasGlobalError(reason));
    //      dispatch(globalErrorText(promiseRejectionEvent));
    // }


export default appReducer;