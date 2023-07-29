// ACTION TYPES
const GET_MESSAGE = "session/GET_MESSAGE";
const GET_MESSAGES = "session/GET_MESSAGES";
const DELETE_MESSAGE = "session/DELETE_MESSAGE";
// const UPDATE_MESSAGE = "session/UPDATE_MESSAGE";
const CREATE_MESSAGE = "session/CREATE_MESSAGE";


//ACTION CREATORS
const getMESSAGEACTION = (messageId) => ({
	type: GET_MESSAGE,
	payload: message,
});
const getMESSAGESACTION = (messages) => ({
	type: GET_MESSAGES,
	payload: messages,
});

const deleteMESSAGEACTION = (messageId) => ({
	type: DELETE_MESSAGE
});

// const updateMESSAGESACTION = (messageId) => ({
// 	type: UPDATE_MESSAGES,
// 	payload: messages,
// });

const createMESSAGEACTION = (newMessage) => ({
	type: CREATE_MESSAGE,
	payload: messages,
});

//THUNK ACTIONS
export const getMessages = () => async(dispatch) => {
    const response = await fetch('/api/messages/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getMessagesAction(data.Messages))
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
            // console.log("FAILED BODY", JSON.stringify(messageData))
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
                Messages: action.payload
            }
        case GET_MESSAGE:
            return{
                ...state,
                message: action.payload
            }
        case CREATE_MESSAGE:
            newState = {...state,
                messages: [...state.messages, action.payload]
                };
            return newState
        case UPDATE_MESSAGE:

            return {
                ...state,
                message: action.payload,
                messages: state.messages?.map(message => message.id === action.payload.id ? action.payload : message)
        }
        case DELETE_MESSAGE:

            return {
                ...state,
                messages: state.messages.filter(message => message.id != action.payload)
            }
        default:
            return state
    }
}
