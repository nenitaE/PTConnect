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

    let exPrescription = useSelector(state => state.exercisePrescription.exercisePrescription);
    if (!exPrescription) return null;
    
    const openDeleteExerciseRxModal = (exPrescriptionId) => {
        setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exPrescriptionId}/>)
    }


    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">{exPrescription.title} Prescription for PatientId: {exPrescription.patientId}</h2>
                {isLoaded && (
                    <div className="individ-exRx-container" key={exPrescription.id}>
                        <div className="exRx-inner-container">
                            <div className="exRx-header">
                                <div className="exRx-header-inner">
                                    <h4>Status: {exPrescription.status}</h4>
                                    <h4>Instructions:</h4>
                                    <div>Perform each exercise in this prescription {exPrescription.dailyFrequency} time(s) per day;<span> {exPrescription.weeklyFrequency} days per week.</span></div> 
                                </div>    
                                    <div  className='editExRxBtn'>
                                                { <a href={`/exercisePrescriptions/${exPrescription.id}/edit`}>
                                                <button className="exRx-button">Edit This Prescription</button>
                                                </a> }
                                    </div>
                            </div> 
                                <div className="whitespace"></div>       
                                    <div className="exercises-outer-container">
                                        <div className="exRxTitle">
                                            <h4>Exercises:</h4>
                                        </div>
                                                <div className="exercises-container">
                                                    {exPrescription.exercises.map(exercise => (
                                                        <div className="indiv-exercise-container" key={exercise.id}>
                                                            <h4>{exercise.name}</h4>
                                                            <p>Exercise Details: {exercise.exerciseData}</p>
                                                            <p>Exercise Images: {exercise.images}</p>
                                                            <p>Perform this exercise for {exercise.sets} set(s).</p>
                                                            <p>Each set should be performed for {exercise.reps} rep(s) with a hold time of {exercise.holdTime} seconds.</p>
                                                            <p>Special Notes from your therapist: {exercise.notes}.</p>
                                                        <div>
                                                            <span  className='editExRxBtn'>
                                                                { <a href={`/exercises/${exercise.id}/edit`}>
                                                                <button className="exRx-button">Edit This Exercise</button>
                                                                </a> }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    ))}
                                            </div>
                                        
                                    </div>
                        </div>
                    </div>
                )}
        </div>
     );
}
 
export default ExercisePrescriptionDetails;