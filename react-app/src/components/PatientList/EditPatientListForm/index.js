import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientList, getPatientLists, updatePatientList } from "../../../store/patientLists";
import { useHistory, useParams } from "react-router-dom";
import './EditPatientListForm.css';

const EditPatientListForm = ({ patientList, formType })  => {
    console.log("🚀 ~ file: index.js:8 ~ EditPatientListForm ~ patientList:", patientList)
    const { patientListId } = useParams();
    console.log("🚀 ~ file: index.js:9 ~ UpdatePatientListForm ~ patientListId:", patientListId)
    
    //Get Patient List by Id
    const dispatch = useDispatch();
    let hasErrors = false;

    const clinicianId = useSelector((state) => state.session.user?.id);
    
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [patientId, setPatientId] = useState("")
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const updateEmail = (e) => setEmail(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    useEffect(() => {
        dispatch(getPatientList(patientListId))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const currentData = {
            "clinicianId": clinicianId,
            "patientId": patientId
        }
        const patientListData = {
            "email": email,
            "status": status
        }
        const finalData = {
            ...currentData,
            ...patientListData
        }

        //dispatch the edited form data
        const editedPatientList = await dispatch(updatePatientList(patientListId, finalData))
        if (editedPatientList) {
            history.push('/patientLists/current');
            dispatch(getPatientLists)
        }
    }


    return (
        <div className='update-PL-container'>
       
          <form className ='PL-form' onSubmit={handleSubmit} >      
                      <h3 className="form-editPL-description">Use This Form To Edit Your Patient List</h3>  
                        <div className='input-container'>
                                  <label htmlFor='email'>Enter patient's email</label>
                                      
                                      <input 
                                          type="text"
                                          placeholder="email"
                                          required={true}
                                          value={email}
                                          onChange={updateEmail}
                                      />
                        </div>
                        <div>
                            <label  htmlFor='status'>Patient Status </label>
                                {hasSubmitted && !status && (
                                    <label htmlFor='status' className='field-error'>Status is required</label>
                                )}
                                <select 
                                    className='createPLdropdown'
                                    id="status" 
                                    onChange={updateStatus} 
                                    required={true}
                                >
                                    <option value={"active"}>active</option>
                                    <option value={"discharged"}>discharged</option> 
                                </select>
                        </div>
                              <input className="updatePLBtn" type="submit" value={formType} />
          </form>
      </div>

    )
}

export default EditPatientListForm