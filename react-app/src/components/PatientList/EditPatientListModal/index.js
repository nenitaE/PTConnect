import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { updatePatientList, getPatientLists, getPatientList } from '../../../store/patientList';

const EditPatientListModal = ({patientListId}) => {
    console.log("🚀 ~ file: index.js:8 ~ EditPatientListModal ~ patientListId:", patientListId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatientList(patientListId))
    }, [dispatch, patientListId]);

    const currPatientList = useSelector((state) => state.patientList.patientList);
        console.log("🚀 ~ file: index.js:17 ~ EditPatientListModal ~ patientList:", currPatientList)
        
    const { closeModal } = useModal();
    const history = useHistory();
    
    const [status, setStatus] = useState('active');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
  
    const clinicianId = useSelector((state) => state.session.user?.id);
    
    useEffect(() => {
        if (!currPatientList) {
            dispatch(getPatientList(patientListId))
        }
    }, [dispatch, currPatientList, patientListId])
    
    useEffect(() => {
        if (currPatientList) {
            setStatus(currPatientList.status)
        }
    }, [dispatch, currPatientList, currPatientList.status])

   
   
    // const patientList = patientListsById[patientListId]
    const patientId = currPatientList.patientId
    console.log("🚀 ~ file: index.js:23 ~ EditPatientListModal ~ patientId:", patientId)
    const patientEmail = currPatientList.email
    console.log("🚀 ~ file: index.js:25 ~ EditPatientListModal ~ patientEmail:", patientEmail)

    

    const handleSubmit = async (e) => {
        console.log("**********inside submit editModal")
        e.preventDefault();
        const errors = {};
        if (!status) {
            errors.status = "Status is required."
        }
        if (Object.keys(errors) && Object.keys(errors).length > 0) {
            return setErrors(errors);
        }

        const currentData = {
            "clinicianId": clinicianId,
            "patientId": patientId,
            "email": patientEmail
        }

        console.log("🚀 ~ file: index.js:53 ~ handleSubmit ~ currentData:", currentData)
        
        const patientListData = {
            "status": status
        }
        console.log("🚀 ~ file: index.js:61 ~ handleSubmit ~ patientListData:", patientListData)
            
        const finalData = {
            ...currentData,
            ...patientListData
        }
        console.log("🚀 ~ file: index.js:66 ~ handleSubmit ~ finalData:", finalData)
            

        const editedPatientList = await dispatch(updatePatientList(patientListId, finalData))
        console.log("🚀 ~ file: index.js:74 ~ handleSubmit ~ editedPatientList:", editedPatientList)
        
        if (editedPatientList) {
            console.log("**********line 77 editModal")
            dispatch(getPatientLists())
            .then(closeModal)
            .then(history.push('/patientLists/current'))            
        } else {
            console.log("**********line 82 editModal")
            setErrors({ errors: editedPatientList });
            closeModal();
        }
        
    }


    return ( 
        <div className='update-PL-container'>
            <h3 className="form-editPL-description">Edit Patient Status</h3>   
                  <form className ='PL-form' onSubmit={handleSubmit} >      
                        <ul className="errors">
                            {errors.status && <li>{errors.status}</li>}
                            {errors.errors && errors.errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                             <div>
                                <label  htmlFor='status' className='pL-status-title'></label>
                                    <select 
                                        className='createPLdropdown'
                                        type="text"
                                        id="pL_status" 
                                        onChange={(e) => setStatus(e.target.value)} 
                                        required={true}
                                    >
                                        <option>Select Status</option>
                                        <option value={"active"}>active</option>
                                        <option value={"discharged"}>discharged</option> 
                                        <option value={"pending"}>pending</option> 
                                    </select>
                            </div>
                            <div className="editPl-button-container">
                                <button className="updatePLBtn" type="submit" >
                                Update Patient Status
                                </button>
                                <button className="keepPLBtn" type="button" onClick={closeModal}>
                                    Keep Current Status (Don't Update)
                                </button>
                            </div>
                  </form>
              </div>
     );
}
 
export default EditPatientListModal;
