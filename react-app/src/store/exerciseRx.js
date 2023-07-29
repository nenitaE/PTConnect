// ACTION TYPES
const GET_EXERCISEPRESCRIPTION = "session/GET_EXERCISEPRESCRIPTION";
const GET_EXERCISEPRESCRIPTIONS = "session/GET_EXERCISEPRESCRIPTIONS";
const DELETE_EXERCISEPRESCRIPTION = "session/DELETE_EXERCISEPRESCRIPTION";
const UPDATE_EXERCISEPRESCRIPTION = "session/UPDATE_EXERCISEPRESCRIPTION";
const CREATE_EXERCISEPRESCRIPTION = "session/CREATE_EXERCISEPRESCRIPTION";


//ACTION CREATORS
const getEXERCISEPRESCRIPTIONACTION = (exercisePrescriptionId) => ({
	type: GET_EXERCISEPRESCRIPTION,
	payload: exercisePrescription,
});
const getEXERCISEPRESCRIPTIONSACTION = (exercisePrescriptions) => ({
	type: GET_EXERCISEPRESCRIPTIONS,
	payload: exercisePrescriptions,
});

const deleteEXERCISEPRESCRIPTIONACTION = (exercisePrescriptionId) => ({
	type: DELETE_EXERCISEPRESCRIPTION
});

const updateEXERCISEPRESCRIPTIONSACTION = (exercisePrescriptionId) => ({
	type: UPDATE_EXERCISEPRESCRIPTIONS,
	payload: exercisePrescriptions,
});

const createEXERCISEPRESCRIPTIONACTION = (newExercisePrescription) => ({
	type: CREATE_EXERCISEPRESCRIPTION,
	payload: exercisePrescriptions,
});

//THUNK ACTIONS
export const getExercisePrescriptions = () => async(dispatch) => {
    const response = await fetch('/api/exercisePrescriptions/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getExercisePrescriptionsAction(data.ExercisePrescriptions))
        return data;
    }
}
export const getExercisePrescription = (exercisePrescriptionId) => async(dispatch) => {
    const response = await fetch(`/api/ExercisePrescriptions/${exercisePrescriptionId}`);
    if(response.ok){
        const exercisePrescription = await response.json();
        dispatch(getexercisePrescriptionAction(exercisePrescription))
        return exercisePrescription;
    }
}

export const updateExercisePrescription = (exercisePrescriptionId, exercisePrescriptionData) => async(dispatch) =>{

    const response = await fetch(`/api/exercisePrescriptions/${exercisePrescriptionId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercisePrescriptionData)
    })

    if(response.ok){
        const updatedExercisePrescription = await response.json();
        dispatch(updateExercisePrescriptionAction(updatedExercisePrescription));

        return updatedExercisePrescription;
    } else if (response.status < 500){


        const data = response.json();

        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const deleteExercisePrescription = (exercisePrescriptionId) => async(dispatch) => {
    const response = await fetch(`/api/exercisePrescriptions/${exercisePrescriptionId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteExercisePrescriptionAction(exercisePrescriptionId))
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors;
        }
    }else {
        return ('An error occurred. Please try again')
    }
}


export const createExercisePrescription = (exercisePrescriptionData) => async(dispatch) =>{
    console.log("********INSIDE CREATE ExercisePrescription THUNK******")
    try {
        const response = await fetch('/api/exercisePrescriptions', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercisePrescriptionData)
        });
        if(response.ok){
            const newExercisePrescription = await response.json();
            dispatch(createExercisePrescriptionAction(newExercisePrescription));
            return newExercisePrescription
        } else if (response.status <= 500){
            // console.log("FAILED BODY", JSON.stringify(exercisePrescriptionData))
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

//EXERCISEPRESCRIPTION REDUCER

const initialState = {
    exercisePrescriptions: null,
    exercisePrescription: [null]
};

export default function exercisePrescriptionReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        case GET_EXERCISEPRESCRIPTIONS:
            return{
                ...state,
                ExercisePrescriptions: action.payload
            }
        case GET_EXERCISEPRESCRIPTION:
            return{
                ...state,
                exercisePrescription: action.payload
            }
        case CREATE_EXERCISEPRESCRIPTION:
            newState = {...state,
                exercisePrescriptions: [...state.exercisePrescriptions, action.payload]
                };
            return newState
        case UPDATE_EXERCISEPRESCRIPTION:

            return {
                ...state,
                exercisePrescription: action.payload,
                exercisePrescriptions: state.exercisePrescriptions?.map(exercisePrescription => exercisePrescription.id === action.payload.id ? action.payload : exercisePrescription)
        }
        case DELETE_EXERCISEPRESCRIPTION:

            return {
                ...state,
                exercisePrescriptions: state.exercisePrescriptions.filter(exercisePrescription => exercisePrescription.id != action.payload)
            }
        default:
            return state
    }
}
