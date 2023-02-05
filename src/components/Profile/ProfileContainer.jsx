import React from "react";
import Profile from "./Profile";
import {
  getProfileInfo,
  getStatus,
  savePhoto,
  saveProfile,
  updateStatus,
} from "../../redux/profileReducer";
import Error from "./../common/Error";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 25786;
      // this.props.authorizedUserId;
      // if (!userId) {
      //   withAuthRedirect();
      //   // this.props.history.push("/login");
      // }
      //25786;
    }
    this.props.getProfileInfo(userId);

    // this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
    // if (this.props.error !== null) {
    //   alert(this.props.error);
    //   // <Error error={this.props.error} />;
    // }
  }

  render() {
    return (
      <>
        {this.props.error ? <Error error={this.props.error} /> : null}
        <Profile
          {...this.props}
          error={this.props.error}
          isOwner={!this.props.match.params.userId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  error: state.profilePage.error,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} match={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, {
    getProfileInfo,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
