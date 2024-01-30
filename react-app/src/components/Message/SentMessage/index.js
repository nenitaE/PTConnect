import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getMessages} from "../../../store/message"
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useModal } from "../../../context/Modal";

const SentMessage = () => {
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    console.log("🚀 ~ file: index.js:13 ~ SentMessage ~ userIsClinician:", userIsClinician)
    const[userIsPatient, setUserIsPatient] = useState("");
    const[senderIsClinician, setSenderIsClinician] = useState("");

    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getMessages())
      .then(() => setIsLoaded(true))
    }, [dispatch])
    
    let currentUserMessages = useSelector(state=> state.message.messages);
    console.log("🚀 ~ file: index.js:26 ~ Message ~ currentUserMessages:", currentUserMessages)

    if (!currentUserMessages) return null;

    return (
        <div className="message-main-container">
          <div className="link-container">
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/current">Inbox</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/sent">Sent Messages</NavLink>
                <NavLink className="message-link" activeclassname="is-active"  to="/messages/new">Compose New Message</NavLink>
            </div>
              <div></div>
              <div className="message-container">
                <div className="inbox-container">
                  {isLoaded && (userIsClinician = true) &&(currentUserMessages.senderIsClinician = true) && (currentUserMessages.map((currentUserMessage) => (
                    <div className="inbox" key={currentUserMessages.id}>
                      <span>{currentUserMessage.createdAt}</span><p>{currentUserMessage.body}</p>
                    </div>
                  )))}
                  </div>


              </div>
        </div>
        
        );
}
 
export default SentMessage;