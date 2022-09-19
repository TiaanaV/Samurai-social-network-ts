import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBar: navbarReducer,
    usersPage:usersReducer,
    auth: authReducer,
    form:formReducer,
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store  = store
export default store; 