// ACTION TYPES
const GET_USER = "users/getUser";
const GET_USERS = "users/getUsers";
const GET_USER_CLINICIANS = "users/getUserClinicians";

//ACTION CREATORS
const getUserAction = (userId) => {
	return {
        type: GET_USER,
        payload: userId
    }
    
};
const getUsersAction = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
};
const getUserCliniciansAction = (users) => {
    return {
        type: GET_USER_CLINICIANS,
        payload: users
    }
};


//THUNK ACTIONS
export const getUsers = () => async(dispatch) => {
    const response = await fetch('/api/users/');
    if(response.ok){
        const data = await response.json();
        dispatch(getUsersAction(data.Users))
        return data;
    }
}
export const getUserClinicians = () => async(dispatch) => {
    const response = await fetch('/api/users/clinicians');
    if(response.ok){
        const data = await response.json();
        dispatch(getUserCliniciansAction(data.Users))
        return data;
    }
}
export const getUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if(response.ok){
        const user = await response.json();
        dispatch(getUserAction(user))
        return user;
    }
}

//USER REDUCER

const initialState = {
    users: null
};

export default function userReducer(state = initialState, action){
    
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                users: action.payload
            }
        case GET_USER_CLINICIANS:
            return{
                ...state,
                users: action.payload
            }
        case GET_USER:
            return{
                ...state,
                user: action.payload
            }
        
        default:
            return state
    }
}
