import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientExercisePrescriptions} from "../../../store/exerciseRx";
import ExercisePrescriptionTile from "../ExerciseRxTile";
import './PatientExRx.css'

const PatientExercisePrescription = ({patientId}) => {
console.log("🚀 ~ file: index.js:9 ~ PatientExercisePrescription ~ patientId:", patientId)
    patientId = useParams()
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescription ~ sessionUser:", sessionUser)
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getPatientExercisePrescriptions(patientId))
            .then(() => setIsLoaded(true))
    }, [dispatch, patientId])

    let patientExercisePrescriptions = useSelector(state => state.exercisePrescription.exercisePrescriptions);
    console.log("🚀 ~ file: index.js:22 ~ ExercisePrescription ~ patientExercisePrescriptions:", patientExercisePrescriptions)
    
    if (!patientExercisePrescriptions) return null;

    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">Exercise Prescriptions For PatientID {patientId}:</h2>
            <div className="exerciseRxOuterContainer">
                
                <div className="exerciseRxContainer">
                    {isLoaded && patientExercisePrescriptions.map(exercisePrescription => (
                        <div className="individ-exRx-tile" key={exercisePrescription.id}>
                            <ExercisePrescriptionTile exPrescription={exercisePrescription}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default PatientExercisePrescription;