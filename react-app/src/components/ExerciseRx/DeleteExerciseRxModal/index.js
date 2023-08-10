import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { deleteExercisePrescription, getExercisePrescription, getExercisePrescriptions } from '../../../store/exerciseRx';


const DeleteExerciseRxModal = ({exercisePrescriptionId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    useEffect(() => {
        dispatch(getExercisePrescription(exercisePrescriptionId))
        dispatch(getExercisePrescriptions())
    }, [dispatch, exercisePrescriptionId])

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteExercisePrescription(exercisePrescriptionId))
        .then(dispatch(getExercisePrescriptions()))
        .then(closeModal)
        .then(history.push('/exercisePrescriptions/current'))
    }



    return ( 
        <div className='modal-container'>
            <h2 className="deletetext">Confirm Delete</h2>
            <h3>Are you sure you want to delete this Exercise Prescription from your list?</h3>
            <button className="modal-button delete-button" onClick={(handleDelete)}>
                {'Yes (Delete Exercise Prescription)'}
            </button>
            <button className="keepPLBtn" onClick={closeModal}>
                {'No (Keep Exercise Prescription)'}
            </button>
        </div>
     );
}
 
export default DeleteExerciseRxModal;