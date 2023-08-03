import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, createMessage} from "../../../store/message";
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getPatientLists } from '../../../store/patientList';

const MessageForm = ({ message, formType}) => {
    const currUserId = useSelector((state) => state.session.user?.id);
    const currUserIsClinician = useSelector((state) => state.session.user?.isClinician);
    const history = useHistory();

    const [body, setBody] = useState("");
    const [patientId, setPatientId] = useState("");
    const [clinicianId, setClinicianId] = useState("");
    const [senderIsClinician, setSenderIsClinician] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    let hasErrors = false;


    const updatePatientId = (e) => setPatientId(e.target.value);
    const updateClinicianId = (e) => setClinicianId(e.target.value);
    const updateSenderIsClinician = (e) => setSenderIsClinician(e.target.value);
    const updateBody = (e) => setBody(e.target.value);
    useEffect(() => {
        const data = dispatch(getMessages());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        // console.log("Inside Handle SUbmit...PList component>>>>>>>>>>>>>>")
        e.preventDefault();
        setHasSubmitted(true);

        const message = {
            clinicianId,
            patientId,
            senderIsClinician,
            body
        }
        const newData = await dispatch(createMessage(message));
        if (newData.id) {
            setErrors(newData.errors);
            let messageId = newData.id;
            dispatch(getMessages(messageId))
            history.push('/messages/current')
        } else {
            alert('Message error.')
        }
    }
        if (!currUserId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)

       



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
                            <h3 className='newMessageTitleContainer'>Create a message.</h3>              
                                <div className='newMessageInnerContainer'>
                                    <h3>
                                        <div>
                                            <label  htmlFor='patientId'>Recipient </label>
                                                {hasSubmitted && !patientId && (
                                                    <label htmlFor='status' className='field-error'>Recipient is required</label>
                                                )}
                                                <select 
                                                    className='createMessageDropdown'
                                                    id="patientId" 
                                                    onChange={updatePatientId} 
                                                    required={true}
                                                >
                                                    <option value={"patientId1"}>patientId1</option>
                                                    <option value={"patientId2"}>patientId2</option> 
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
                                </div> 
                    </div>

            </form>

        </div>
    )

}

export default MessageForm;