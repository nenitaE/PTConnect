import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getMessages} from "../../../store/message"
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import DeleteMessageModal from "../DeleteMessageModal";
import { useModal } from "../../../context/Modal";

const SentMessage = () => {
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    const[userIsPatient, setUserIsPatient] = useState("");
    const[senderIsClinician, setSenderIsClinician] = useState("");

    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getMessages())
      .then(() => setIsLoaded(true))
    }, [dispatch])
    
    useEffect(() => {
      if (userIsClinician === false) setUserIsPatient(true);
        else (setUserIsPatient(false))
    }, [userIsClinician])
    
    let currentUserMessages = useSelector(state=> state.message.messages);
    const currPatientSentBox = currentUserMessages?.filter(messageSent => messageSent.senderIsClinician === false);
    const currTherapistSentBox = currentUserMessages?.filter(messageSent => messageSent.senderIsClinician === true);

    if (!currentUserMessages) return null;

    const openDeleteMessageModal = (messageId) => {
      setModalContent(<DeleteMessageModal messageId={messageId}/>)
    }

    return (
        <div className="message-main-container">
          <div className="link-container">
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/current">Inbox</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/sent">Sent Messages</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/new">Compose New Message</NavLink>
            </div>
              <div></div>
              <div className="message-container">
                <div className="sentbox-container">
                <h1 className="message-header">Sent Messages</h1> 
                      {isLoaded && userIsPatient && currPatientSentBox.map((currentUserMessage) => (
                        <div className="inbox" key={currentUserMessage.id}>
                          <span>{currentUserMessage.createdAt}</span>
                          <p>{currentUserMessage.body}</p>
                          {/* <span><button className="delete-msg-button" onClick={() => openDeleteMessageModal(currentUserMessage.id)}>Delete</button></span> */}
                        </div>
                      ))}
                      {isLoaded && !userIsPatient && currTherapistSentBox.map((currentUserMessage) => (
                        <div className="inbox" key={currentUserMessage.id}>
                          <span>{currentUserMessage.createdAt}</span>
                          <p>Messages To Patient ID: {currentUserMessage.patientId}</p>
                          <p>{currentUserMessage.body}</p>
                          {/* <span><button className="delete-msg-button" onClick={() => openDeleteMessageModal(currentUserMessage.id)}>Delete</button></span> */}
                        </div>
                      ))}
                  </div>


              </div>
        </div>
        
        );
}
 
export default SentMessage;