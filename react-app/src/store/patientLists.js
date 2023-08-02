// ACTION TYPES
const GET_PATIENTLIST = "patientLists/getPatientList";
const GET_PATIENTLISTS = "patientLists/getPatientLists";
const DELETE_PATIENTLIST = "patientLists/deletePatientList";
const UPDATE_PATIENTLIST = "patientLists/updatePatientList";
const CREATE_PATIENTLIST = "patientLists/createPatientList";


//ACTION CREATORS
const getPatientListAction = (patientListId) => {
	return {
        type: GET_PATIENTLIST,
        payload: patientListId
    }
    
};
const getPatientListsAction = (patientLists) => {
    return {
        type: GET_PATIENTLISTS,
        payload: patientLists
    }
};

const deletePatientListAction = (patientListId) => {
	return {
        type: DELETE_PATIENTLIST,
        payload: patientListId
    }
};

const updatePatientListAction = (patientListId) => {
	return {
        type: UPDATE_PATIENTLIST,
        payload: patientListId
    }
};

const createPatientListAction = (newPatientList) => {
	return {
        type: CREATE_PATIENTLIST,
	    payload: newPatientList
    }
};

//THUNK ACTIONS
export const getPatientLists = () => async(dispatch) => {
    const response = await fetch('/api/patientLists/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getPatientListsAction(data.PatientLists))
        return data;
    }
}
export const getPatientList = (patientListId) => async(dispatch) => {
    const response = await fetch(`/api/patientLists/${patientListId}`);
    if(response.ok){
        const patientList = await response.json();
        dispatch(getPatientListAction(patientList))
        return patientList;
    }
}

export const updatePatientList = (patientListId, patientListData) => async(dispatch) =>{

    const response = await fetch(`/api/patientLists/${patientListId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientListData)
    })

    if(response.ok){
        const updatedPatientList = await response.json();
        dispatch(updatePatientListAction(updatedPatientList));

        return updatedPatientList;
    } else if (response.status < 500){
        const data = response.json();

        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const deletePatientList = (patientListId) => async(dispatch) => {
    const response = await fetch(`/api/patientLists/${patientListId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deletePatientListAction(patientListId))
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors;
        }
    }else {
        return ('An error occurred. Please try again')
    }
}


export const createPatientList = (patientListData) => async(dispatch) =>{
    console.log("********INSIDE CREATE PatientList THUNK******")
    try {
        const response = await fetch('/api/patientLists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientListData)
        });
        if(response.ok){
            const newPatientList = await response.json();
            dispatch(createPatientListAction(newPatientList));
            return newPatientList
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

//PATIENTLIST REDUCER

const initialState = {
    patientLists: null,
    patientList: [null]
};

export default function patientListReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        case GET_PATIENTLISTS:
            return{
                ...state,
                PatientLists: action.payload
            }
        case GET_PATIENTLIST:
            return{
                ...state,
                patientList: action.payload
            }
        case CREATE_PATIENTLIST:
            // newState = {...state,
            //     patientLists: [...state.patientLists, action.payload]
            //     };
            newState = {...state, [action.payload]:{...state, ...action.patientLists}};
            return newState
        case UPDATE_PATIENTLIST:
            // return {
            //     ...state,
            //     patientList: action.payload,
            //     patientLists: state.patientLists?.map(patientList => patientList.id === action.payload.id ? action.payload : patientList)
            // }
            newState = {...state, [action.payload]: {...state, ...action.patientLists}};
            return newState;
        case DELETE_PATIENTLIST:
            // return {
            //     ...state,
            //     patientLists: state.patientLists.filter(patientList => patientList.id != action.payload)
            // }
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
