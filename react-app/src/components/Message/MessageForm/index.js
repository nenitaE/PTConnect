import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, createMessage} from "../../../store/message";
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getPatientLists, getAllPatientLists } from '../../../store/patientList';
import { getClinicians } from '../../../store/clinician';
import './MessageForm.css'

const MessageForm = ({ message, patientLists, currUserPatientLists, clinicianId, formType}) => {
    console.log("🚀 ~ MessageForm ~ clinicianId:", clinicianId)
    console.log("🚀 ~ MessageForm ~ currUserPatientLists:", currUserPatientLists)
    console.log("🚀 ~ MessageForm ~ FORMpatientLists:", patientLists)
    const currUserId = useSelector((state) => state.session.user?.id);
    console.log("🚀 ~ MessageForm ~ currUserId:", currUserId)
    const currUserIsClinician = useSelector((state) => state.session.user?.isClinician);
    console.log("🚀 ~ MessageForm ~ currUserIsClinician:", currUserIsClinician);
    // const clinicianId = useSelector((state) => state.patientList?.patientLists.clinicianId)
    // const currClinicianId = currUserPatientLists.clinicianId
    // console.log("🚀 ~ MessageForm ~ clinicianId :", clinicianId )
    const history = useHistory();

    const [body, setBody] = useState("");
    const [patientId, setPatientId] = useState("");
    // const [clinicianId, setClinicianId] = useState("");
    const [senderIsClinician, setSenderIsClinician] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    let hasErrors = false;


    const updatePatientId = (e) => setPatientId(e.target.value);
    // const updateClinicianId = (e) => setClinicianId(e.target.value);
    const updateSenderIsClinician = (e) => setSenderIsClinician(e.target.value);
    const updateBody = (e) => setBody(e.target.value);
    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    // useEffect(() => {
    //     if (currUserIsClinician === true) setClinicianId(currUserId);
    //         else {
    //             setClinicianId(currUserPatientLists.clinicianId)
    //             setPatientId(currUserPatientLists.patientId)
    //         }                
    // }, [setClinicianId, currUserId, currUserIsClinician, currUserPatientLists])
    
    // console.log("🚀 ~ useEffect ~ patientId:", patientId)
    // console.log("🚀 ~ useEffect ~ clinicianId:", clinicianId)
    // const patientLists = useSelector((state) => state);
    // const currUserPatientLists = patientLists.filter(patientList => patientList.patientId === currUserId | patientList.clinicianId === currUserId)
    // console.log("🚀 ~ MessageForm ~ currUserPatientLists:", currUserPatientLists)
    
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
        // setClinicianId(currUserPatientLists.clinicianId)

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
                <h2>{formType}</h2>
                    <div className='newMessageContainer'>
                        {senderIsClinician &&
                                <div className='newMessageInnerContainer'>
                                    <h3>
                                        
                                        <div>
                                            <label  htmlFor='patientId'>Send to:  </label>
                                                {hasSubmitted && !patientId && (
                                                    <label htmlFor='status' className='field-error'>Recipient is required</label>
                                                )}
                                                <select 
                                                    className='createMessageDropdown'
                                                    id="patientId"  
                                                    type="number"
                                                    onChange={updatePatientId} 
                                                    required={true}
                                                >
                                                <option>Which of your patients is this prescription for?</option> 
                                                {(patientLists && patientLists.map(list => (    
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
                                                <input className='newPLSubmitBTN' type="submit" value={formType} />
                                    
                                                                        </h3> 
                                </div>} 
                                {!senderIsClinician &&
                                <div className='newMessageInnerContainer'>
                                    <h3>
                                    <label>
                                            <textarea
                                                id='messageBody'
                                                placeholder="Compose your message here.."
                                                required
                                                value={body}
                                                type="text"
                                                onChange={updateBody}/>
                                                
                                        </label>
                                                <input className='newPLSubmitBTN' type="submit" value="send" />
                                    </h3>
                                    </div>}
                    </div>

            </form>

        </div>
    )

}

export default MessageForm;