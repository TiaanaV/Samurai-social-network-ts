import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import state, { subscribe } from "./redux/state"
import './index.css';
import App from './App';
import { addMessage, addPost } from './redux/state';
import { updateNewPostText, updateNewMessageText} from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
 let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updateNewPostText ={updateNewPostText} addMessage={addMessage} updateNewMessageText={updateNewMessageText}/>
      </React.StrictMode>
  );
}


rerenderEntireTree(state);
subscribe(rerenderEntireTree);

reportWebVitals();
