import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
    console.log("🚀 ~ file: index.js:23 ~ ExercisePrescription ~ patientLists:", patientLists)
    let currentExercisePrescriptions = useSelector(state => state.exercisePrescription.exercisePrescriptions);
    console.log("🚀 ~ file: index.js:25 ~ ExercisePrescription ~ currentExercisePrescriptions:", currentExercisePrescriptions)
    
    if (!currentExercisePrescriptions) return null;
    if (!patientLists) return null
    // if (!patientLists.length) return null
    
    // if (userIsClinician === true) {

    // }
    
    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">Current Exercise Prescriptions:</h2>
            <div className="exerciseRxOuterContainer">
                <div className="create-new-exRx-container">
                    {sessionUser.isClinician && (patientLists.length > 0) &&(
                        <div  className='create-new-exRx'>
                            <a href="/exercisePrescriptions/new">
                                <button className="create-new-exRx-Bttn">
                                    Create a New Exercise Rx
                                </button>
                            </a>
                        </div>
                    )}
                     {sessionUser.isClinician && (patientLists.length === 0) &&(
                        <div className="create-emptyPL">
                            <div className="header-noPL">
                                <h2>This feature will be activated once you add patients to your patient list.</h2>
                                <button className="exRx-button" ><NavLink className="exRx-nav" to={`/patientLists/current`} >Click here to add patients to your list</NavLink></button>
                            </div>
                        </div>
                     )}
                     {!sessionUser.isClinician && (currentExercisePrescriptions.length === 0) &&(
                        <div className="create-emptyPL">
                            <div className="header-noPL">
                                <h2>This feature will be activated once you have been connected with your physical therapist.</h2>
                            </div>
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