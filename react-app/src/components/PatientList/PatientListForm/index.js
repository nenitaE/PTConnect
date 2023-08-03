import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientLists, createPatientList} from "../../../store/patientList"
import './PatientListForm.css'

const PatientListForm = ({ patientList, formType}) => {
    const clinicianId = useSelector((state) => state.session.user?.id);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [patientId, setPatientId] = useState("")
    const [status, setStatus] = useState("active");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    let hasErrors = false;

    const updatePatientId = (e) => setPatientId(e.target.value);
    const updateEmail = (e) => setEmail(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    useEffect(() => {
        const data = dispatch(getPatientLists());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        // console.log("Inside Handle SUbmit...PList component>>>>>>>>>>>>>>")
        e.preventDefault();
        setHasSubmitted(true);

        const patientList = {
            clinicianId,
            patientId,
            email,
            status
        }
        const newData = await dispatch(createPatientList(patientList));
        console.log("🚀 ~ file: index.js:43 ~ handleSubmit ~ newData:", newData)
        if (newData.id) {
            setErrors(newData.errors);
            let patientListId = newData.id;
            dispatch(getPatientLists(patientListId))
            history.push('/patientLists/current')
        } else {
            alert('Patient is already on your list.')
        }
    }
        if (!clinicianId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)

       



    return (
        <div className='newPLFormContainer'>
            <form className='PLForm' onSubmit={handleSubmit}>
                <h2>{formType}</h2>
                    <div className='newPLInnerContainer'>
                            <h3 className='newPL-TitleContainer'>Use this form to add a new patient to your patient list.</h3>              
                                <div className='newTTcontainer'>
                                    <h3>
                                        <div>
                                            <label htmlFor='patientId'>Enter new patient's ID number. </label>
                                                {hasSubmitted && !patientId && (
                                                    <label htmlFor='patientId' className='patientId-label'>Patient's ID number is required</label>
                                                )}
                                                <input 
                                                    type="number"
                                                    placeholder="patient's ID number"
                                                    required={true}
                                                    value={patientId}
                                                    onChange={updatePatientId}
                                                />
                                        </div>
                                        <div>
                                            <label htmlFor='email'>Enter new patient's email address. </label>
                                                {hasSubmitted && !email && (
                                                    <label htmlFor='email' className='email-label'>Email is required</label>
                                                )}
                                                <input 
                                                    type="string"
                                                    placeholder="patient's email"
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
                                                <input className='newPLSubmitBTN' type="submit" value={formType} />
                                    </h3> 
                                </div> 
                    </div>

            </form>

        </div>
    )

}

export default PatientListForm;