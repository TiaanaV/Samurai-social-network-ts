import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import classes from "./App.module.css";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar avatar={props.state.navBar.popularFriend} name={props.state.navBar.popularFriend}
        />
        <div className={classes.appWrapperContent}>
          <Routes>
          <Route path="/profile" element={<Profile profilePage={props.state.profilePage} addPost={props.addPost} updateNewPostText ={props.updateNewPostText}/>} />
            <Route path="/dialogs/*" element={<Dialogs avatar={props.state.dialogsPage} dialogsPage={props.state.dialogsPage} messages={props.state.dialogsPage} addMessage={props.addMessage} updateNewMessageText={props.updateNewMessageText}/>} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/friends" element={<Friends/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
