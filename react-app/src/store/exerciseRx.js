// ACTION TYPES
const GET_EXERCISEPRESCRIPTION = "exercisePrescriptions/getExercisePrescription";
const GET_EXERCISEPRESCRIPTIONS = "exercisePrescriptions/getExercisePrescriptions";
const DELETE_EXERCISEPRESCRIPTION = "exercisePrescriptions/deleteExercisePrescription";
const UPDATE_EXERCISEPRESCRIPTION = "exercisePrescriptions/updateExercisePrescription";
const CREATE_EXERCISEPRESCRIPTION = "exercisePrescriptions/createExercisePrescription";


//ACTION CREATORS
const getExercisePrescriptionAction = (exercisePrescriptionId) => {
    return {
        type: GET_EXERCISEPRESCRIPTION,
        payload: exercisePrescriptionId
    }
};
const getExercisePrescriptionsAction = (exercisePrescriptions) => {
	return {
        type: GET_EXERCISEPRESCRIPTIONS,
	    payload: exercisePrescriptions
    }
};

const deleteExercisePrescriptionAction = (exercisePrescriptionId) => {
	return {
        type: DELETE_EXERCISEPRESCRIPTION,
        payload: exercisePrescriptionId
    }
};

const updateExercisePrescriptionAction = (exercisePrescriptionId) => {
	return {
        type: UPDATE_EXERCISEPRESCRIPTION,
	    payload: exercisePrescriptionId
    }
};

const createExercisePrescriptionAction = (newExercisePrescription) => {
	return {
        type: CREATE_EXERCISEPRESCRIPTION,
	    payload: newExercisePrescription
    }
};

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
        dispatch(getExercisePrescriptionAction(exercisePrescription))
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
            // newState = {...state,
            //     exercisePrescriptions: [...state.exercisePrescriptions, action.payload]
            //     };
            newState = {...state, [action.payload]:{...state, ...action.exercisePrescriptions}}
            return newState
        case UPDATE_EXERCISEPRESCRIPTION:
            // return {
            //     ...state,
            //     exercisePrescription: action.payload,
            //     exercisePrescriptions: state.exercisePrescriptions?.map(exercisePrescription => exercisePrescription.id === action.payload.id ? action.payload : exercisePrescription)
            // }
            newState = {...state, [action.payload]:{...state, ...action.exercisePrescriptions}}
            return newState
        case DELETE_EXERCISEPRESCRIPTION:
            // return {
            //     ...state,
            //     exercisePrescriptions: state.exercisePrescriptions.filter(exercisePrescription => exercisePrescription.id != action.payload)
            // }
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
