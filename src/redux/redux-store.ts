import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBar: navbarReducer,
    usersPage:usersReducer,
    auth: authReducer,
    form:formReducer,
    app:appReducer,
})

type RootReducerType = typeof rootReducer 
export type AppStateType = ReturnType<RootReducerType>

type PropertyTypes<T> = T extends {[key:string]: infer U } ? U :  never

export type InferActionsTypes<T extends {[key:string]:(...args: any[]) => any}> = ReturnType<PropertyTypes<T>>

export type BaseThunkType< A extends Action<any>, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A >;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));
//@ts-ignore
window.__store  = store
export default store; 

