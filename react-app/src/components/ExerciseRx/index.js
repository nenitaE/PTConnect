import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescriptions} from "../../store/exerciseRx";
import { getPatientLists} from "../../store/patientList";
import ExercisePrescriptionTile from "./ExerciseRxTile";
import './ExerciseRx.css'

const ExercisePrescription = () => {

    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userIsClinician = sessionUser.userIsClinician
  
    useEffect(() => {
        dispatch(getExercisePrescriptions())
        dispatch(getPatientLists())
            .then(() => setIsLoaded(true))
    }, [dispatch])
    
    let patientLists = useSelector(state => state.patientList.patientLists);
    let currentExercisePrescriptions = useSelector(state => state.exercisePrescription.exercisePrescriptions);
    
    if (!currentExercisePrescriptions) return null;
    
    // if (userIsClinician === true) {

    // }
    
    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">Current Exercise Prescriptions:</h2>
            <div className="exerciseRxOuterContainer">
                <div className="create-new-exRx-container">
                    {sessionUser.isClinician && (
                        <div  className='create-new-exRx'>
                            <a href="/exercisePrescriptions/new">
                                <button className="create-new-exRx-Bttn">
                                    Create a New Exercise Rx
                                </button>
                            </a>
                        </div>
                    )}
                </div>
                <div className="exerciseRxContainer">
                    {isLoaded && currentExercisePrescriptions.map(exercisePrescription => (
                        <div className="individ-exRx-tile" key={exercisePrescription.id}>
                            <ExercisePrescriptionTile exPrescription={exercisePrescription} user={sessionUser}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default ExercisePrescription;