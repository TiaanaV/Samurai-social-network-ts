import { connect } from "react-redux";
import { compose } from "redux";
import Navbar from "./Navbar";

let mapStateToProps = (state) => {
  return {
    popularFriend: state.navBar.popularFriend,
    links: state.navBar.links,
  };
};

const NavbarContainer = compose(connect(mapStateToProps))(Navbar);

export default NavbarContainer;
