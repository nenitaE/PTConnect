import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions} from "../../store/exerciseRx";
import { getUsers } from "../../store/user";
import ExercisePrescriptionTile from "./ExerciseRxTile";
import DeleteExerciseRxModal from "./DeleteExerciseRxModal"
import { useModal } from "../../context/Modal";
import './ExerciseRx.css'

const ExercisePrescription = () => {

    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescription ~ sessionUser:", sessionUser)
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getExercisePrescriptions())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    let currentExercisePrescriptions = useSelector(state => state.exercisePrescription.exercisePrescriptions);
    console.log("🚀 ~ file: index.js:26 ~ ExercisePrescription ~ currentExercisePrescriptions:", currentExercisePrescriptions)
    
    if (!currentExercisePrescriptions) return null;
    
    const openDeleteExerciseRxModal = (exercisePrescriptionId) => {
        setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exercisePrescriptionId}/>)
    }


    return ( 
        <div className="exerciseRxRoot">
            <h2 className="exRxTitle">Current Exercise Prescriptions:</h2>
            <div className="exerciseRxOuterContainer">
                
                <div className="exerciseRxContainer">
                    {isLoaded && currentExercisePrescriptions.map(exercisePrescription => (
                        <div className="individ-exRx-tile" key={exercisePrescription.id}>
                            <ExercisePrescriptionTile exPrescription={exercisePrescription}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default ExercisePrescription;