import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPatientList} from "../../../../store/patientList"
import { useModal } from '../../../../context/Modal';
import '../../../PatientList/PatientListForm/PatientListForm.css'

const ConnectPatientListModal = ({ patientList, patientLists}) => {
    console.log("🚀 ~ file: index.js:8 ~ ConnectPatientListModal ~ patientList:", patientList)
    console.log("🚀 ~ file: index.js:8 ~ ConnectPatientListModal ~ patientLists:", patientLists)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const patientId = useSelector((state) => state.session.user?.id);
    const [isConnected, setIsConnected] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (!patientLists) {
            return
        } else {
        const connectedPatient = patientLists.filter(patientList => patientList.patientId === patientId)
        if (connectedPatient) {
            setIsConnected(false)
            }
        }
    }, [patientLists, patientId])

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
                {!isConnected ? (
                <div>
                    <h4>
                        I would like to get Connected with Dr. Demo!
                    </h4>
                    <button className="updatePLBtn" type="submit" >
                            Connect Me
                    </button>
                </div>
                ) : (
                    <div className="already-connected">
                        <h2>Good News!</h2>
                        <h3>You are already connected with a physical Therapist, no need to connect at this time.</h3>
                    </div>



                )
                }
            </form>

        </div>
    )

}

export default ConnectPatientListModal;