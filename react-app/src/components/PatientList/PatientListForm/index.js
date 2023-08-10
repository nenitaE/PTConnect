import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientLists, getPatientList, createPatientList} from "../../../store/patientList"
import './PatientListForm.css'

const PatientListForm = ({ patientList, formType}) => {
    console.log("🚀 ~ file: index.js:8 ~ PatientListForm ~ patientList:", patientList)
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
        dispatch(getPatientLists());
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
        console.log("🚀 ~ file: index.js:41 ~ handleSubmit ~ patientList:", patientList)
        
        console.log("🚀 ~ file: index.js:43 ~ handleSubmit ~ newData:", newData)
        if (newData.id) {
            let patientListId = newData.id;
            dispatch(getPatientList(patientListId));
            history.push('/patientLists/current')
        } else {
            setErrors(newData)
            return alert('Invalid Form Input')
        }
    }
    
    if (!clinicianId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)

    const handleDemoPatient1 = async (e) => {
        e.preventDefault();
        setPatientId(13);
        setEmail('abraham@aa.io');
        setStatus('active')
    };   
    const handleDemoPatient2 = async (e) => {
        e.preventDefault();
        setPatientId(14);
        setEmail('isaac@aa.io');
        setStatus('active')
    };   
    const handleDemoPatient3 = async (e) => {
        e.preventDefault();
        setPatientId(15);
        setEmail('jake@aa.io');
        setStatus('active')
    };   
    const handleDemoPatient4 = async (e) => {
        e.preventDefault();
        setPatientId(16);
        setEmail('sarahL@aa.io');
        setStatus('active')
    };   
    const handleDemoPatient5 = async (e) => {
        e.preventDefault();
        setPatientId(17);
        setEmail('johnB@aa.io');
        setStatus('active')
    };   
    const handleDemoPatient6 = async (e) => {
        e.preventDefault();
        setPatientId(18);
        setEmail('april@aa.io');
        setStatus('active')
    };   



    return (
        <div className='newPLFormContainer'>
            <form className='PLForm' onSubmit={handleSubmit}>
                
                <h2>{formType}</h2>
                    <div className='newPLInnerContainer'>
                            <h3 className='newPL-TitleContainer'>Use this form to add a new patient to your patient list.</h3>              
                                <div className='newPLcontainer'>
                                    <h3 >
                                        <div className='newPL-inputs'>
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
                                        <div className='whitespace10'></div>
                                        <div className='newPL-inputs'>
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
                                        <div className='whitespace10'></div>
                                        <div className='newPL-inputs'>
                                            <label className='newPL-inputs' htmlFor='status'>Patient Status </label>
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
                                                    <option value={"pending"}>pending</option>
                                                    <option value={"discharged"}>discharged</option> 
                                                </select>
                                        </div>
                                        <div className="PLcreate-button-container">
                                                <input className='newPLSubmitBTN' type="submit" value={formType} />
                                        </div>
                                    </h3>
                                    <ul className='form-validation-errors'>
                                    {hasSubmitted && errors.length > 0 && errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul> 
                                </div>
                                <div className="demoPLcontainer">
                                    <h3>For demonstration purposes click one of the demo patients below to test form.</h3>
                                        <div className="pLform-demo-button-container">
                                            <button onClick={handleDemoPatient1}>Click to Fill Demo New Patient1 Data</button>
                                            <button onClick={handleDemoPatient2}>Click to Fill Demo New Patient2 Data</button>
                                            <button onClick={handleDemoPatient3}>Click to Fill Demo New Patient3 Data</button>
                                            <button onClick={handleDemoPatient4}>Click to Fill Demo New Patient4 Data</button>
                                            <button onClick={handleDemoPatient5}>Click to Fill Demo New Patient5 Data</button>
                                            <button onClick={handleDemoPatient6}>Click to Fill Demo New Patient6 Data</button>
                                        </div>
                                </div> 
                    </div>

            </form>

        </div>
    )

}

export default PatientListForm;