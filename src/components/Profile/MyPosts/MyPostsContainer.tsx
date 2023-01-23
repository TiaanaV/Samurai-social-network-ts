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
    newPostText: state.profilePage.newPostText,
  };
};

let mapDispatchToProps = (dispatch:any) => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};

const MyPostsContainer = compose<React.Component<PropsType>>(connect(mapStateToProps, mapDispatchToProps))(
  MyPosts
);

export default MyPostsContainer;
