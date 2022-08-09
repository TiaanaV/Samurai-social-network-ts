import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
  { id: 1, message: "Hi!", likeCount: 15 },
  { id: 2, message: "Yo!", likeCount: 45 },
  { id: 3, message: "Where are you?", likeCount: 55 },
];

let dialogs = [
  { id: 1, name: "Dima" },
  { id: 2, name: "Andrey" },
  { id: 3, name: "Elena" },
  { id: 4, name: "Kate" },
  { id: 5, name: "Sergey" },
];

let messages = [
  { id: 1, message: "Hi!" },
  { id: 2, message: "Yo!" },
  { id: 3, message: "Where are you?" },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
