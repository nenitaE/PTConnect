import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPatientList} from "../../../../store/patientList"
import { useModal } from '../../../../context/Modal';
import '../../../PatientList/PatientListForm/PatientListForm.css'

const ConnectPatientListModal = ({ patientList}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        // console.log("Inside Handle SUbmit...PList component>>>>>>>>>>>>>>")
        e.preventDefault();
        setHasSubmitted(true)
        await dispatch(createPatientList(patientList))
        .then(closeModal)
    }
    


    return (
        <div >
            <form  onSubmit={handleSubmit}>
                <h4>
                    I would like to get Connected with Dr. Demo!
                </h4>
                <button className="updatePLBtn" type="submit" >
                        Connect Me
                </button>
            </form>

        </div>
    )

}

export default ConnectPatientListModal;