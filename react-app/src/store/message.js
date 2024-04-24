// ACTION TYPES
const GET_MESSAGE = "messages/GET_MESSAGE";
const GET_MESSAGES = "messages/GET_MESSAGES";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";
// const UPDATE_MESSAGE = "messages/UPDATE_MESSAGE";
const CREATE_MESSAGE = "messages/CREATE_MESSAGE";


//ACTION CREATORS
const getMessageAction = (messageId) => {
	return {
        type: GET_MESSAGE,
        payload: messageId
    }
};
const getMessagesAction = (messages) => {
	return {
        type: GET_MESSAGES,
	    payload: messages
    }
};

const deleteMessageAction = (messageId) => {
	return {
        type: DELETE_MESSAGE,
        payload: messageId
    }
};

// const updateMessagesAction = (messageId) => ({
// 	type: UPDATE_MESSAGE,
// 	payload: messageId,
// });

const createMessageAction = (newMessage) => {
	return {
        type: CREATE_MESSAGE,
	    payload: newMessage
    }
};

//THUNK ACTIONS
export const getMessages = () => async(dispatch) => {
    const response = await fetch('/api/messages/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getMessagesAction(data.messages))
        return data;
    }
}
export const getMessage = (messageId) => async(dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`);
    if(response.ok){
        const message = await response.json();
        dispatch(getMessageAction(message))
        return message;
    }
}

// export const updateMessage = (messageId, messageData) => async(dispatch) =>{

//     const response = await fetch(`/api/messages/${messageId}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(messageData)
//     })

//     if(response.ok){
//         const updatedMessage = await response.json();
//         dispatch(updateMessageAction(updatedMessage));

//         return updatedMessage;
//     } else if (response.status < 500){


//         const data = response.json();

//         if(data.errors){
//             return data.errors;
//         } else {
//             return ('An error occurred. Please try again')
//         }
//     }
// }

export const deleteMessage = (messageId) => async(dispatch) => {
    const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteMessageAction(messageId))
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors;
        }
    }else {
        return ('An error occurred. Please try again')
    }
}


export const createMessage = (messageData) => async(dispatch) =>{
    console.log("********INSIDE CREATE Message THUNK******")
    console.log("********INSIDE CREATE Message THUNK messageData******", messageData)
    try {
        const response = await fetch('/api/messages', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });
        if(response.ok){
            const newMessage = await response.json();
            dispatch(createMessageAction(newMessage));
            return newMessage
        } else if (response.status <= 500){
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        }else {
            return ('An error occurred. Please try again')
        }
    } catch (error) {
        console.error('Network error: ', error);
        return error;
    }
}

//Message REDUCER

const initialState = {
    messages: null,
    message: [null]
};

export default function messageReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        case GET_MESSAGES:
            return{
                ...state,
                messages: action.payload
            }
        case GET_MESSAGE:
            return{
                ...state,
                message: action.payload
            }
        case CREATE_MESSAGE:
            // newState = {...state,
            //     messages: [...state.messages, action.payload]
            //     };
            // return newState
            newState = {...state, [action.payload]:{...state, ...action.messages}};
            return newState
        // case UPDATE_MESSAGE:

        //     return {
        //         ...state,
        //         message: action.payload,
        //         messages: state.messages?.map(message => message.id === action.payload.id ? action.payload : message)
        // }
        case DELETE_MESSAGE:
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
