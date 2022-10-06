import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";
import React from "react";

let state = {
    posts:[
        { id: 1, message: "Hi!", likeCount: 15 },
        { id: 2, message: "Yo!", likeCount: 45 },
        { id: 3, message: "Where are you?", likeCount: 55 },
      ],
}

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra");
    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(4);
})

it('message of new post should be correct', () => {
    let action = addPostActionCreator("it-kamasutra");
    let newState = profileReducer(state,action);

    expect(newState.posts[3].message).toBe("it-kamasutra");
})

it('after deleting length of posts should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(2);
})

it(`after deleting length of posts shouldn't be decrement if id is incorrect`, () => {
    let action = deletePost(1000);
    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(3);
})
   
   