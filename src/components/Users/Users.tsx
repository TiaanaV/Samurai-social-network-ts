import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user-icon.png";
import { NavLink } from "react-router-dom";
import { Paginator } from "../common/Paginator/Paginator";
import { UsersType } from "../../types common/types";

type PropsType = {
  totalUsersCount:number
  pageSize:number
  currentPage:number
  users:Array<UsersType>
  followingInProgress:Array<number>

  onPageChanged: (currentPage:number) => void
  unfollow: (userId: number | null) => void
  follow: (userId: number | null) => void
}

let Users:React.FC<PropsType> = (props) => {
  return (
    <div>
      <Paginator
        totalItemCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      {props.users.map((u) => (
        <div key={u.id} className={classes.users}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                {/* <img
                  className={classes.avatarUsers}
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                /> */}
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
