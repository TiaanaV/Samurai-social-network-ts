
type LinksType = {
    path: string
    nameOfPage: string
}

type PopularFriendType = {
    name: string
    avatar: string
}

let initialState ={
    links:[
        { path: "/profile", nameOfPage: "Profile" },
        { path: "/dialogs", nameOfPage: "Messages" },
        { path: "/users", nameOfPage: "Users" },
        { path: "/news", nameOfPage: "News" },
        { path: "/music", nameOfPage: "Music" },
        { path: "/settings", nameOfPage: "Settings" },
    ] as Array<LinksType>,
    popularFriend:[
        {name: "Dima", avatar:"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"},
        {name: "Sergey", avatar:"https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80"},
        {name: "Elena",avatar:"https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"}
        ] as Array<PopularFriendType>
}

type InitialStateType = typeof initialState

const navbarReducer = (state = initialState):InitialStateType => {

    return state;
}

export default navbarReducer;