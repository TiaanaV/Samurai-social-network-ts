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
import LoginPage from "./components/Login/LoginPage";
import React from "react";
import { connect } from "react-redux";
import {  useParams } from "react-router-dom";
import { compose } from "redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component{
  componentDidMount() {
    this.props.initializeApp();
  }

    render(){
      if(!this.props.initialized){
       return <Preloader/>
      }
       return (
          <div className={classes.appWrapper}>
            <HeaderContainer/>
            <NavbarContainer
            />
            <div className={classes.appWrapperContent}>
              <Routes>
                <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                <Route path="/profile/*" element={<ProfileContainer/>}/>
                <Route path="/dialogs/*" element={<DialogsContainer/>} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<UsersContainer/>} />
                <Route path="/friends" element={<Friends/>} />
                <Route path="/login" element={<LoginPage/>} />
              </Routes>
            </div>
          </div>
      );
  };
}


const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
      <WrappedComponent
          {...props}
          params={params}
      />
  );
};

let WithUrlDataContainerComponent = withRouter(App);

const mapStateToProps = (state) => ({
  initialized:state.app.initialized,
})
  export default  compose(connect(mapStateToProps, {initializeApp})(WithUrlDataContainerComponent));
