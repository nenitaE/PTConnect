import DeleteExerciseRxModal from "../DeleteExerciseRxModal"
import { useModal } from "../../../context/Modal";
import './ExerciseRxTile.css'



const ExercisePrescriptionTile = ({exPrescription}) => {

    const {setModalContent} = useModal();
    const openDeleteExerciseRxModal = (exPrescriptionId) => {
        setModalContent(<DeleteExerciseRxModal exercisePrescriptionId={exPrescriptionId}/>)
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
                        {<div href={`/exercisePrescriptions/${exPrescription.id}`}>
                            <button className="exRx-button">View Full Ex Rx</button>
                        </div>}
                        
                        {<div href={`/exercisePrescriptions/${exPrescription.id}/edit`}>
                            <button className="exRx-button">Edit Prescription</button>
                        </div> }
                        <div className='deleteExRxBtn'>
                            <button className="exRx-button" onClick={() => openDeleteExerciseRxModal(exPrescription.id)}>Delete Prescription</button>
                        </div>    
                    </div>
            </div>  
        </div>
     );
}
 
export default ExercisePrescriptionTile;