import React, { useEffect, useState } from "react";
import {  useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions} from "../../../store/exerciseRx";
import DeleteExerciseRxModal from "../DeleteExerciseRxModal"
import { useModal } from "../../../context/Modal";
import './ExerciseRxDetails.css'

const ExercisePrescriptionDetails = () => {
    const {exercisePrescriptionId} = useParams();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescription ~ sessionUser:", sessionUser)
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getExercisePrescription(exercisePrescriptionId))
            .then(() => setIsLoaded(true))
    }, [dispatch, exercisePrescriptionId])

    let currentExercisePrescriptions = useSelector(state => state.exercisePrescription.ExercisePrescription);
    console.log("🚀 ~ file: index.js:26 ~ ExercisePrescription ~ currentExercisePrescriptions:", currentExercisePrescriptions)
    
    if (!currentExercisePrescriptions) return null;
    
    const openDeleteExerciseRxModal = (exercisePrescriptionId) => {
        setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exercisePrescriptionId}/>)
    }


    return ( 
        <div className="exerciseRxContainer">
            <h2>Current Exercise Prescriptions:</h2>
                {isLoaded && currentExercisePrescriptions.map(exercisePrescription => (
                    <div className="individ-exRx-container" key={exercisePrescription.id}>
                        <h3>{exercisePrescription.title} Protocol</h3> 
                        <span>Assigned to PatientID: {exercisePrescription.patientId}</span>
                        <p></p>
                        <span>Status: {exercisePrescription.status}</span>
                        <h4>Instructions:</h4>
                        <div>Perform each exercise in this prescription {exercisePrescription.dailyFrequency} times per day;<span> {exercisePrescription.weeklyFrequency} days per week.</span></div> 
                        <div className="exercise-list">
                            <h4>Exercises:</h4>
                                {exercisePrescription.exercises.map(exercise => (
                                    <div className="exercise-container" key={exercise.id}>
                                        <h4>{exercise.name}</h4>
                                        <p>Exercise Details: {exercise.exerciseData}</p>
                                        <p>Exercise Images: {exercise.images}</p>
                                        <p>Perform this exercise for {exercise.sets} set(s).</p>
                                        <p>Each set should be performed for {exercise.reps} rep(s) with a hold time of {exercise.holdTime} seconds.</p>
                                        <p>Special Notes from your therapist: {exercise.notes}.</p>
                                        
                                    </div>
                                ))}
                        </div>
                        
                        <div>
                            <span className='deleteExRxBtn'>
                                <button className="exRx-button" onClick={() => openDeleteExerciseRxModal(exercisePrescription.id)}>Delete Prescription</button>
                            </span>
                            <span> </span>
                            <span  className='editExRxBtn'>
                                { <a href={`/exercisePrescriptions/${exercisePrescription.id}/edit`}>
                                <button className="exRx-button">Edit Prescription</button>
                                </a> }
                            </span>
                        </div>
                    </div>
                ))}
        </div>
     );
}
 
export default ExercisePrescriptionDetails;