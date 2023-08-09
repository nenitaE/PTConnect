// ACTION TYPES
const GET_PATIENTLIST = "patientLists/getPatientList";
const GET_PATIENTLISTS = "patientLists/getPatientLists";
const GET_ALL_PATIENTLISTS = "patientLists/getAllPatientLists";
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
const getAllPatientListsAction = (patientLists) => {
    return {
        type: GET_ALL_PATIENTLISTS,
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
    console.log("**************INTHUNK getpatientLists of current")
    const response = await fetch('/api/patientLists/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getPatientListsAction(data.patientLists))
        return data;
    }
}
export const getAllPatientLists = () => async(dispatch) => {
    const response = await fetch('/api/patientLists/');
    if(response.ok){
        const data = await response.json();
        dispatch(getAllPatientListsAction(data.patientLists))
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
        console.log("🚀 ~ file: patientList.js:91 ~ updatePatientList ~ updatedPatientList:", updatedPatientList)
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
        console.log("🚀 ~ file: patientList.js:133 ~ createPatientList ~ response:", response)
        if(response.ok){
            const newPatientList = await response.json();
            console.log("🚀 ~ file: patientList.js:135 ~ createPatientList ~ newPatientList:", newPatientList)
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
// const initialState = {};

export default function patientListReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        // case GET_ALL_PATIENTLISTS:
        //     action.payload.forEach(patientList => {
        //         newState[patientList.id] = patientList;
        //     })
        //     return newState;
        case GET_PATIENTLISTS:
            return{
                ...state,
                patientLists: action.payload
            }
        case GET_PATIENTLIST:
            return{
                ...state,
                patientList: action.payload
            }
        case CREATE_PATIENTLIST:
            newState = {...state, [action.payload]:{...state, ...action.patientLists}};
            return newState
        case UPDATE_PATIENTLIST:
            newState = {...state, [action.payload]: {...state, ...action.patientList}};
            return newState;
        case DELETE_PATIENTLIST:
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
