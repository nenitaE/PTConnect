import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getMessages} from "../../store/message";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import DeleteMessageModal from "./DeleteMessageModal";
import { useModal } from "../../context/Modal";
import './Message.css';

const Message = () => {
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    const[userIsPatient, setUserIsPatient] = useState("");
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
    // const currUserInbox = currentUserMessages?.filter(messageReceived => messageReceived.senderIsClinician === true);
    const currPatientInbox = currentUserMessages?.filter(messageReceived => messageReceived.senderIsClinician === true);
    const currTherapistInbox = currentUserMessages?.filter(messageReceived => messageReceived.senderIsClinician === false);
    if (!currentUserMessages) return null;

    const openDeleteMessageModal = (messageId) => {
      setModalContent(<DeleteMessageModal messageId={messageId}/>)
      
    }

    return (
      <div className="message-outer-container">
        <div className="background-image-messages">
            <div className="message-main-container">
              <div className="link-container">
                    <NavLink className="message-link" activeclassname="is-active"  to="/messages/current">Inbox</NavLink>
                    <NavLink className="message-link" activeclassname="is-active"  to="/messages/sent">Sent Messages</NavLink>
                    <NavLink className="message-link" activeclassname="is-active"  to="/messages/new">Compose New Message</NavLink>
                </div>
                  <div></div>
                  <div className="message-container">
                   
                    <div className="inbox-container">
                    
                    <h1 className="message-header">Inbox</h1> 
                     
                      {isLoaded && !userIsClinician && currPatientInbox.map((currentUserMessage) => (
                        <div className="inbox" key={currentUserMessage.id}>
                          <span>{currentUserMessage.createdAt}</span>
                          <p className="messageBody">{currentUserMessage.body}</p>
                          <span><button className="delete-msg-button" onClick={() => openDeleteMessageModal(currentUserMessage.id)}>Delete</button></span>
                        </div>
                      ))}
                      {isLoaded && userIsClinician && currTherapistInbox.map((currentUserMessage) => (
                        <div className="inbox" key={currentUserMessage.id}>
                          <span>{currentUserMessage.createdAt}</span>
                          <p>Messages From Patient ID: {currentUserMessage.patientId}</p>
                          <p className="messageBody">{currentUserMessage.body}</p>
                          <span><button className="delete-msg-button" onClick={() => openDeleteMessageModal(currentUserMessage.id)}>Delete</button></span>
                        </div>
                        
                      ))}
                      </div>


                  </div>
            </div>
            </div>
        </div>
        );
}
 
export default Message;