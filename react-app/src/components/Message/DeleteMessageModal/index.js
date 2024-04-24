import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { deleteMessage, getMessages } from '../../../store/message';


const DeleteMessageModal = ({messageId}) => {
    console.log("🚀 ~ file: index.js:9 ~ DeleteMessageModal ~ messageId:", messageId)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteMessage(messageId))
        .then(dispatch(getMessages()))
        .then(closeModal)
        // .then(history.push('/messages/current'))
    }



    return ( 
        <div className='modal-container'>
            <h2 className="deletetext">Confirm Delete</h2>
            <h3>Are you sure you want to delete this message?</h3>
            <button className="modal-button delete-button" onClick={(handleDelete)}>
                {'Yes (Delete Message)'}
            </button>
            <button className="modal-button keep-button" onClick={closeModal}>
                {'No (Keep Message)'}
            </button>
        </div>
     );
}
 
export default DeleteMessageModal;