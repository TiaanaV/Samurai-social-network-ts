
const SEND_MESSAGE = 'dialogsPage/SEND-MESSAGE';

type  DialogsType = {
    id:number
    name:string 
    avatar:string
}
type  MessagesType = {
    id:number
    message:string 
    writer:string
    avatar:string
}
type  NewMessageType = {
    id:number
    message:string 
    writer:string
    avatar:string
}

let initialState = {
    dialogs:[
        { id: 1, name: "Dima", avatar:"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
        { id: 2, name: "Andrey", avatar:"https://images.unsplash.com/photo-1497993950456-cdb57afd1cf1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" },
        { id: 3, name: "Elena",avatar:"https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" },
        { id: 4, name: "Kate", avatar:"https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"},
        { id: 5, name: "Sergey", avatar:"https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80" },
      ] as Array<DialogsType>,
    messages:[
        { id: 1, message: "Hi!", writer:"Me", avatar:"https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" },
        { id: 2, message: "Yo!", writer:"Dima", avatar:"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"},
        { id: 3, message: "Where are you?", writer:"Me",avatar:"https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" },
      ] as Array<MessagesType>,
    newMessage: null as Array<NewMessageType> | null
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState,action:ActionsTypes):InitialStateType => {
    switch(action.type){
        case SEND_MESSAGE:
            let newMessage = {
                id:4,
                message: action.newMessageBody,
                writer:"Me",
                avatar:"https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    };
            return{
                ...state,
                messages:[...state.messages,newMessage]
            };
            default:
                return state;
            }
}

type ActionsTypes = SendMessageActionCreatorType

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE 
    newMessageBody:string
}
export const sendMessageActionCreator =(newMessageBody:string):SendMessageActionCreatorType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;