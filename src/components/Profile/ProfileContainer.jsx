import React from "react";
import Profile from "./Profile";
import { getProfileInfo } from "../../redux/profileReducer";
import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    this.props.getProfileInfo(userId);
  }

  render() {
    if (!this.props.isAuth) return <Navigate to={"/login"} />;
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default connect(mapStateToProps, { getProfileInfo })(
  withRouter(ProfileContainer)
);
