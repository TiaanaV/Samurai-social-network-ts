import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk";

import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navBar: navbarReducer,
    usersPage:usersReducer,
    auth: authReducer,
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store  = store
export default store; 