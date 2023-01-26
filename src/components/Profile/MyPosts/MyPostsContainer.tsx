import { connect } from "react-redux";
import { compose } from "redux";
import { addPostActionCreator } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostsType } from "../../../types common/types";
import MyPosts from "./MyPosts";

type MapStatePropsType = {
  posts: Array<PostsType>
  newPostText: string
}

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPost.message, /// был newPostText  - но его нет в стейте - это пейлоад ActionCreator(a)
  };
};

let mapDispatchToProps = (dispatch:any):MapDispatchPropsType => {
  return {
    addPost: (message: string) => {
      dispatch(addPostActionCreator(message));  // был newPostText  - но его нет в стейте - это пейлоад ActionCreator(a)
    },
  };
};

const MyPostsContainer = compose<React.Component<PropsType>>(connect(mapStateToProps, mapDispatchToProps))(
  MyPosts
);

export default MyPostsContainer;
