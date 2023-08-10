// ACTION TYPES
const GET_EXERCISEPRESCRIPTION = "exercisePrescriptions/getExercisePrescription";
const GET_EXERCISEPRESCRIPTIONS = "exercisePrescriptions/getExercisePrescriptions";
// const GET_PATIENT_EXERCISEPRESCRIPTIONS = "exercisePrescriptions/getPatientExercisePrescriptions";
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
// const getPatientExercisePrescriptionsAction = (patientId) => {
// 	return {
//         type: GET_PATIENT_EXERCISEPRESCRIPTIONS,
// 	    payload: patientId
//     }
// };

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
    console.log("******INSIDE GET EXRX THUNK****************")
    const response = await fetch('/api/exercisePrescriptions/current');
    if(response.ok){
        const data = await response.json();
        console.log("🚀 ~ file: exerciseRx.js:50 ~ getExercisePrescriptions ~ data:", data)
        
        dispatch(getExercisePrescriptionsAction(data.exercisePrescriptions))
        console.log("🚀 ~ file: exerciseRx.js:53 ~ getExercisePrescriptions ~ data.exercisePrescriptions:", data.exercisePrescriptions)
        console.log("******AFTER DISPATCH-INSIDE GET EXRX THUNK****************")
        return data;
    }
}

// export const getPatientExercisePrescriptions = (patientId) => async(dispatch) => {
//     console.log("******INSIDE GET PATIENT EXRX THUNK****************")
//     const response = await fetch(`/api/exercisePrescriptions/patient/${patientId}`);
//     if(response.ok){
//         console.log("🚀 ~ file: exerciseRx.js:72 ~ getPatientExercisePrescriptions ~ response:", response)
//         const data = await response.json();
//         console.log("🚀 ~ file: exerciseRx.js:57 ~ getExercisePrescriptions ~ exercisePrescriptions:", data.exercisePrescriptions)
        
//         dispatch(getPatientExercisePrescriptionsAction(data.exercisePrescriptions))
//         console.log("******AFTER DISPATCH-INSIDE GET PATIENT EXRX THUNK****************")
//         return data;
//     }
// }

export const getExercisePrescription = (exercisePrescriptionId) => async(dispatch) => {
    const response = await fetch(`/api/exercisePrescriptions/${exercisePrescriptionId}`);
    if(response.ok){
        const exercisePrescription = await response.json();
        console.log("🚀 ~ file: exerciseRx.js:62 ~ getExercisePrescription ~ exercisePrescription:", exercisePrescription)
        dispatch(getExercisePrescriptionAction(exercisePrescription))
        return exercisePrescription;
    }
}


export const updateExercisePrescription = (exercisePrescriptionId, exercisePrescriptionData) => async(dispatch) => {
    console.log("🚀 ~ file: exerciseRx.js:94 ~ updateExercisePrescription ~ exercisePrescriptionData:", exercisePrescriptionData)
    console.log("🚀 ~ file: exerciseRx.js:94 ~ updateExercisePrescription ~ exercisePrescriptionId:", exercisePrescriptionId)

    const response = await fetch(`/api/exercisePrescriptions/${exercisePrescriptionId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercisePrescriptionData)
    })

    if(response.ok){
        const updatedExercisePrescription = await response.json();
        console.log("🚀 ~ file: exerciseRx.js:108 ~ updatedExercisePrescription:", updatedExercisePrescription)
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
    console.log("********INSIDE DELETE ExercisePrescription THUNK******")
    const response = await fetch(`/api/exercisePrescriptions/${exercisePrescriptionId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        console.log("🚀 ~ file: exerciseRx.js:128 ~ deleteExercisePrescription ~ data:", data)
        dispatch(deleteExercisePrescriptionAction(exercisePrescriptionId))
        console.log("🚀 ~ file: exerciseRx.js:130 ~ deleteExercisePrescription ~ exercisePrescriptionId:", exercisePrescriptionId)
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
        console.log("🚀 ~ file: exerciseRx.js:149 ~ createExercisePrescription ~ response:", response)
        if(response.ok){
            const newExercisePrescription = await response.json();
            console.log("🚀 ~ file: exerciseRx.js:151 ~ createExercisePrescription ~ newExercisePrescription:", newExercisePrescription)
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
                exercisePrescriptions: action.payload
            }
        case GET_EXERCISEPRESCRIPTION:
            return{
                ...state,
                exercisePrescription: action.payload
            }
        case CREATE_EXERCISEPRESCRIPTION:
            newState = {...state, [action.payload]:{...state, ...action.exercisePrescriptions}}
            return newState
        case UPDATE_EXERCISEPRESCRIPTION:
            newState = {...state, [action.payload]:{...state, ...action.exercisePrescriptions}}
            return newState
        case DELETE_EXERCISEPRESCRIPTION:
            newState = {...state};
            delete newState[action.payload]
            return newState;
        default:
            return state
    }
}
