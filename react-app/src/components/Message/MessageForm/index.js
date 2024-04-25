import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, createMessage} from "../../../store/message";
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getPatientLists, getAllPatientLists } from '../../../store/patientList';
import { getClinicians } from '../../../store/clinician';
import './MessageForm.css'

const MessageForm = ({ message, patientLists, currUserPatientLists, formType}) => {
    
    const currUserId = useSelector((state) => state.session.user?.id);
    const currUserIsClinician = useSelector((state) => state.session.user?.isClinician);
    const clinician = currUserPatientLists ? currUserPatientLists[0]?.clinicianId : null
    const patient = currUserPatientLists ? currUserPatientLists[0]?.patientId : null
    const history = useHistory();

    const [body, setBody] = useState("");
    const [patientId, setPatientId] = useState(patient);
    const [clinicianId, setClinicianId] = useState(clinician);
    
   
    const [senderIsClinician, setSenderIsClinician] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    let hasErrors = false;


    const updateClinicianData = (e) => {
                                    setPatientId(e.target.value) 
                                    setClinicianId(currUserId)
                                    setSenderIsClinician(true)
                                    };

                                    
    const updateBody = (e) => setBody(e.target.value);
    const updatePatientData = (e) => {
                                        setBody(e.target.value);
                                        setPatientId(currUserId);
                                        setClinicianId(clinician)
                                        setSenderIsClinician(false)
                                    }

    // useEffect(() => {
    //     if (!clinicianId) setClinicianId(clinician)      
         
    // },[clinicianId, setClinicianId, clinician]);
   
    // useEffect(() => {
    //     if (!patientId) setPatientId(patient)  
    // },[patientId, patient]);

    // useEffect(() => {
    //     dispatch(getMessages());
    // }, [dispatch]);

    // useEffect(() => {
    //     // if (currUserIsClinician === true) setClinicianId(currUserId);
    //     if (!currUserIsClinician) setPatientId(currUserId);
    //         else {
    //             setClinicianId(currUserPatientLists.clinicianId)
    //             setPatientId(currUserPatientLists.patientId)
    //         }                
    // }, [setClinicianId, currUserId, currUserIsClinician, currUserPatientLists])
    
    // const patientLists = useSelector((state) => state);
    // const currUserPatientLists = patientLists.filter(patientList => patientList.patientId === currUserId | patientList.clinicianId === currUserId)
    
    
    if (!currUserPatientLists){
        return (
            <h1>Loading...</h1>
        )
    }

    if (!patientLists) {
        
        return (
            <h1>Loading...</h1>
        )
    }
    

    const handleSubmit = async (e) => {
        console.log("Inside Handle SUbmit...Message component>>>>>>>>>>>>>>")
        e.preventDefault();
        setHasSubmitted(true);

        const message = {
            clinicianId,
            patientId,
            body,
            senderIsClinician
        }
        const newData = await dispatch(createMessage(message));
        if (newData.id) {
            let messageId = newData.id;
            dispatch(getMessages(messageId))
            history.push('/messages/current')
        } else {
            setErrors(newData);
            return alert('Message error.')
        }
    }
    if (!currUserId) return (<div><p>You must be logged in to access this page</p>{history.push('/')}</div>)

       



    return (
        <div className="message-main-container">
            <div className="link-container">
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/current">Inbox</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/sent">Sent Messages</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/new">Compose New Message</NavLink>
            </div>
            <form className='PLForm' onSubmit={handleSubmit}>
                <h2 className='messageFormTitle'>{formType}</h2>
                    <div className='newMessageContainer'>
                    {currUserIsClinician && (currUserPatientLists.length === 0) &&(
                        <div className="create-emptyPL">
                            <div className="header-noPL">
                                <h2>This feature will be activated once you add patients to your patient list.</h2>
                                <button className="exRx-button" ><NavLink className="exRx-nav" to={`/patientLists/new`} >Click here to add patients to your list</NavLink></button>
                            </div>
                        </div>
                     )}
                        {currUserIsClinician && (currUserPatientLists.length > 0) && (
                                <div className='newMessageInnerContainer'>
                                    <h3>
                                        
                                        <div className='messageDropdown'>
                                            <label  htmlFor='patientId'>Send to:  </label>
                                                {hasSubmitted && !patientId && (
                                                    <label htmlFor='status' className='field-error'>Recipient is required</label>
                                                )}
                                                <select 
                                                    className='createMessageDropdown'
                                                    id="patientId"  
                                                    type="number"
                                                    onChange={updateClinicianData} 
                                                    required={true}
                                                >
                                                <option>Select a patient from your patient list</option> 
                                                {(currUserPatientLists && currUserPatientLists.map(list => (    
                                                    <option value={list.patientId}>PatientID: {list.patientId}, Email: {list.email}</option>)))}
                                                </select>
                                                
                                        </div>
                                        <label>
                                            <textarea
                                                id='messageBody'
                                                placeholder="Compose your message here.."
                                                required
                                                value={body}
                                                type="text"
                                                onChange={updateBody}/>
                                                
                                        </label>
                                        <p></p>
                                                <input className='newPLSubmitBTN' type="submit" value="SEND" />
                                    
                                                                        </h3> 
                                </div>)} 
                                {!currUserIsClinician && (currUserPatientLists.length === 0) &&(
                                    <div className="create-emptyPL">
                                        <div className="header-noPL">
                                            <h2>This feature will be activated once you have been connected with your physical therapist.</h2>
                                        </div>
                                    </div>
                                )}
                                {!currUserIsClinician && (currUserPatientLists.length > 0) && (
                                <div className='newMessageInnerContainer'>
                                    <h3>
                                    <label>
                                            <textarea
                                                id='messageBody'
                                                placeholder="Compose your message here.."
                                                required
                                                value={body}
                                                type="text"
                                                onChange={updatePatientData}/>
                                                
                                        </label>
                                        <p></p>
                                                <input className='newPLSubmitBTN' type="submit" value="SEND" />
                                    </h3>
                                    </div>)}
                    </div>

            </form>

        </div>
    )

}

export default MessageForm;