import DeleteExerciseRxModal from "../DeleteExerciseRxModal"
import EditExerciseRxModal from "../EditExerciseRxModal";
import { useModal } from "../../../context/Modal";
import { NavLink } from "react-router-dom";
import './ExerciseRxTile.css'



const ExercisePrescriptionTile = ({exPrescription}) => {

    const {setModalContent} = useModal();
    const openDeleteExerciseRxModal = (exPrescriptionId) => {
        setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exPrescriptionId}/>)
    }
    const openEditExerciseRxModal = (exPrescriptionId) => {
        setModalContent(<EditExerciseRxModal exercisePrescriptionId={exPrescriptionId}/>)
    }
    
    return ( 
        <div className="ex-rx-tile-outer-container">
            <div className="ex-rx-tile-inner">  
                <div className="ex-rx-title">
                    <h2>{exPrescription.title}</h2>
                </div>
                    {/* <div className="ex-rx-image-container">
                        <img className="ex-rx-image"
                        src={exPrescription.exercise.images}
                        alt={`${exPrescription.title}`}
                        width="320" height="240"
                        />
                    </div> */}
                    <div className="ex-rx-info">
                        <p>Patient ID: {exPrescription.patientId}</p>
                        <p>Status of Prescription: {exPrescription.status}</p>
                        <span>Frequency: {exPrescription.dailyFrequency} times/day; </span>
                        <span>{exPrescription.weeklyFrequency} days/week</span>
                    </div>
                    <div className="ex-rx-button-container">
                        <div>
                            <button className="exRx-button"><NavLink className="exRx-nav" to={`/exercisePrescriptions/${exPrescription.id}`} >View Full Ex Rx</NavLink></button>
                        </div>
                        <div >
                            <button className="exRx-button" onClick={() => openEditExerciseRxModal(exPrescription.id)}>Edit Prescription</button>
                        </div>    
                        <div >
                            <button className="exRx-button" onClick={() => openDeleteExerciseRxModal(exPrescription.id)}>Delete Prescription</button>
                        </div>    
                    </div>
            </div>  
        </div>
     );
}
 
export default ExercisePrescriptionTile;