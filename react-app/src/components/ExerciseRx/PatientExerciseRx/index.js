import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescriptions} from "../../../store/exerciseRx";
// import ExercisePrescriptionTile from "../ExerciseRxTile";
import './PatientExRx.css'

const PatientExercisePrescription = () => {
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescription ~ sessionUser:", sessionUser)
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getExercisePrescriptions())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    let exercisePrescriptions = useSelector(state => state.exercisePrescription.exercisePrescriptions);
    console.log("🚀 ~ file: index.js:21 ~ PatientExercisePrescription ~ exercisePrescriptions:", exercisePrescriptions)
    console.log("🚀 ~ file: index.js:21 ~ PatientExercisePrescription ~ TYPEOFexercisePrescriptions:", typeof(exercisePrescriptions))
    
    if (!exercisePrescriptions) return null;
    // } else {
    //     patientExercisePrescriptions.find(patientExRxs)
    // }
    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">Exercise Prescriptions For PatientID :</h2>
            <div className="exerciseRxOuterContainer">
                
                {/* <div className="exerciseRxContainer">
                    {isLoaded && patientExercisePrescriptions.map(exercisePrescription => (
                        <div className="individ-exRx-tile" key={exercisePrescription.id}>
                            <ExercisePrescriptionTile exPrescription={exercisePrescription}/>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
     );
}
 
export default PatientExercisePrescription;