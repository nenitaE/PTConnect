// ACTION TYPES
const GET_PATIENTLIST = "session/GET_PATIENTLIST";
const GET_PATIENTLISTS = "session/GET_PATIENTLISTS";
const DELETE_PATIENTLIST = "session/DELETE_PATIENTLIST";
const UPDATE_PATIENTLIST = "session/UPDATE_PATIENTLIST";
const CREATE_PATIENTLIST = "session/CREATE_PATIENTLIST";


//ACTION CREATORS
const getPATIENTLISTACTION = (patientListId) => ({
	type: GET_PATIENTLIST,
	payload: patientList,
});
const getPATIENTLISTSACTION = (patientLists) => ({
	type: GET_PATIENTLISTS,
	payload: patientLists,
});

const deletePATIENTLISTACTION = (patientListId) => ({
	type: DELETE_PATIENTLIST
});

const updatePATIENTLISTSACTION = (patientListId) => ({
	type: UPDATE_PATIENTLISTS,
	payload: patientLists,
});

const createPATIENTLISTACTION = (newPatientList) => ({
	type: CREATE_PATIENTLIST,
	payload: patientLists,
});

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
            // console.log("FAILED BODY", JSON.stringify(patientListData))
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
            newState = {...state,
                patientLists: [...state.patientLists, action.payload]
                };
            return newState
        case UPDATE_PATIENTLIST:

            return {
                ...state,
                patientList: action.payload,
                patientLists: state.patientLists?.map(patientList => patientList.id === action.payload.id ? action.payload : patientList)
        }
        case DELETE_PATIENTLIST:

            return {
                ...state,
                patientLists: state.patientLists.filter(patientList => patientList.id != action.payload)
            }
        default:
            return state
    }
}
