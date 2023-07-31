// ACTION TYPES
const GET_EXERCISE = "exercises/getExercise";
const GET_EXERCISES = "exercises/getExercises";
const DELETE_EXERCISE = "exercises/deleteExercise";
const UPDATE_EXERCISE = "exercises/updateExercise";
const CREATE_EXERCISE = "exercises/createExercise";


//ACTION CREATORS
const getExerciseAction = (exerciseId) => ({
	type: GET_EXERCISE,
	payload: exerciseId,
});
const getExercisesAction = (exercises) => ({
	type: GET_EXERCISES,
	payload: exercises,
});

const deleteExerciseAction = (exerciseId) => ({
	type: DELETE_EXERCISE
});

const updateExerciseAction = (exerciseId) => ({
	type: UPDATE_EXERCISE,
	payload: exerciseId,
});

const createExerciseAction = (newExercise) => ({
	type: CREATE_EXERCISE,
	payload: newExercise,
});

//THUNK ACTIONS
export const getExercises = () => async(dispatch) => {
    const response = await fetch('/api/exercises/current');
    if(response.ok){
        const data = await response.json();
        dispatch(getExercisesAction(data.Exercises))
        return data;
    }
}
export const getExercise = (exerciseId) => async(dispatch) => {
    const response = await fetch(`/api/exercises/${exerciseId}`);
    if(response.ok){
        const exercise = await response.json();
        dispatch(getExerciseAction(exerciseId))
        return exercise;
    }
}

export const updateExercise = (exerciseId, exerciseData) => async(dispatch) =>{

    const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData)
    })

    if(response.ok){
        const updatedExercise = await response.json();
        dispatch(updateExerciseAction(updatedExercise));

        return updatedExercise;
    } else if (response.status < 500){


        const data = response.json();

        if(data.errors){
            return data.errors;
        } else {
            return ('An error occurred. Please try again')
        }
    }
}

export const deleteExercise = (exerciseId) => async(dispatch) => {
    const response = await fetch(`/api/exercises/${exerciseId}`, {
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteExerciseAction(exerciseId))
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
            return data.errors;
        }
    }else {
        return ('An error occurred. Please try again')
    }
}


export const createExercise = (exerciseData) => async(dispatch) =>{
    console.log("********INSIDE CREATE Exercise THUNK******")
    try {
        const response = await fetch('/api/exercises', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseData)
        });
        if(response.ok){
            const newExercise = await response.json();
            dispatch(createExerciseAction(newExercise));
            return newExercise
        } else if (response.status <= 500){
            // console.log("FAILED BODY", JSON.stringify(exerciseData))
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

//EXERCISE REDUCER

const initialState = {
    exercises: null,
    exercise: [null]
};

export default function exerciseReducer(state = initialState, action){
    let newState = {};
    switch(action.type){
        case GET_EXERCISES:
            return{
                ...state,
                Exercises: action.payload
            }
        case GET_EXERCISE:
            return{
                ...state,
                exercise: action.payload
            }
        case CREATE_EXERCISE:
            newState = {...state,
                exercises: [...state.exercises, action.payload]
                };
            return newState
        case UPDATE_EXERCISE:

            return {
                ...state,
                exercise: action.payload,
                exercises: state.exercises?.map(exercise => exercise.id === action.payload.id ? action.payload : exercise)
        }
        case DELETE_EXERCISE:

            return {
                ...state,
                exercises: state.exercises.filter(exercise => exercise.id != action.payload)
            }
        default:
            return state
    }
}
