

// ACTION_TYPES
const GET_CLINICIANS = 'clinicians/getClinicians'


// ACTION CREATOR
const getCliniciansAction = (clinicians) => ({
    type: GET_CLINICIANS,
    payload: clinicians,
});

// THUNK_ACTIONS
export const getClinicians = () => async dispatch => {
    const response = await fetch('/api/clinicians');

    if (response.ok) {
        const data = await response.json();
        dispatch(getCliniciansAction(data.Clinicians));
        return data;
    }
}



// CLINICIAN REDUCER 
const initialState = {
    clinicians: null
};

export default function clinicianReducer(state = initialState, action){
    
    switch (action.type) {
        case GET_CLINICIANS:
            return{
                ...state,
                clinicians: action.payload
            }
        default:
            return state;
    }
}


