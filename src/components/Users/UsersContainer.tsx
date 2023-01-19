import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unfollow,
  toggleFollowingProgress,
  getUsers,
} from "../../redux/usersReducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSuper,
} from "../../redux/users-selectors";
import { PhotosType, UsersType } from "../../types common/types";

type PropsType = {
  totalUsersCount:number
  pageSize:number
  currentPage:number
  users:Array<UsersType>
  isFetching: boolean
  followingInProgress:Array<number>

  onPageChanged: (currentPage:number) => void
  unfollow: (userId: number | null) => void
  follow: (userId: number | null) => void
  getUsers: (currentPage:number,pageSize:number) => void
  setCurrentPage: (pageNumber:number) => void
}

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage,pageSize} = this.props
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber:number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersSuper(state),
    // getUsersSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
  })
)(UsersContainer);
