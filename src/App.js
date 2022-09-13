import classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer/>
        <NavbarContainer
        />
        <div className={classes.appWrapperContent}>
          <Routes>
          <Route path="/profile/:userId" element={<ProfileContainer/>} />
            <Route path="/dialogs/*" element={<DialogsContainer/>} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersContainer/>} />
            <Route path="/friends" element={<Friends/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
