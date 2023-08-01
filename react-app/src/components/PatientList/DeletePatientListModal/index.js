import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { deletePatientList, getPatientLists } from '../../../store/patientLists';


const DeletePatientListModal = ({patientListId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePatientList(patientListId))
        .then(dispatch(getPatientLists()))
        .then(closeModal)
        .then(history.push('/patientLists/current'))
    }



    return ( 
        <div className='modal-container'>
            <h2 className="deletetext">Confirm Delete</h2>
            <h3>Are you sure you want to delete this patient from your list?</h3>
            <button className="modal-button delete-button" onClick={(handleDelete)}>
                {'Yes (Delete Patient)'}
            </button>
            <button className="modal-button keep-button" onClick={closeModal}>
                {'No (Keep Patient)'}
            </button>
        </div>
     );
}
 
export default DeletePatientListModal;