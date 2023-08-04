import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions} from "../../store/exerciseRx";
import { getUsers } from "../../store/user";
import DeleteExerciseRxModal from "./DeleteExerciseRxModal"
import { useModal } from "../../context/Modal";
import './ExerciseRx.css'

const ExercisePrescription = () => {

    // const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescription ~ sessionUser:", sessionUser)
    // const userIsClinician = useSelector(state => state.session.user.isClinician)
    // const {setModalContent} = useModal();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getExercisePrescriptions())
            // .then(() => setIsLoaded(true))
    }, [dispatch])

    let currentExercisePrescriptions = useSelector(state => state.exercisePrescription.ExercisePrescriptions);
    
    // if (!currentExercisePrescriptions) return null;
    
    // const openDeleteExerciseRxModal = (exercisePrescriptionId) => {
    //     setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exercisePrescriptionId}/>)
    // }


    return ( 
        <div className="exerciseRxContainer">
            <h2>Current Exercise Prescriptions:</h2>
                {/* (currentExercisePrescriptions.map(exercisePrescription => (
                    <div className="individ-exRx-container" key={exercisePrescription.id}>
                        <span>{exercisePrescription.title}</span> <span>Status: {exercisePrescription.status}</span>
                        <span>{exercisePrescription.dailyFrequency}</span> <span>Status: {exercisePrescription.weeklyFrequency}</span>
                        <div>
                            <span className='deleteExRxBtn'>
                                <button className="exRx-button" onClick={() => openDeleteExerciseRxModal(exercisePrescription.id)}>Delete</button>
                            </span>
                            <span> </span>
                            <span  className='editExRxBtn'>
                                { <a href={`/exercisePrescritpions/${exercisePrescription.id}/edit`}>
                                <button className="exRx-button">Edit</button>
                                </a> }
                            </span>
                        </div>
                    </div>
                )))} */}
        </div>
     );
}
 
export default ExercisePrescription;