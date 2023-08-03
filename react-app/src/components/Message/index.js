import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getMessages} from "../../store/message";
import { getUsers } from "../../store/user";
import DeleteMessageModal from "./DeleteMessageModal";
import { useModal } from "../../context/Modal";
import './Message.css';

const Message = () => {
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
    }, [dispatch])
    
    let currentUserMessages = useSelector(state=> state.message.messages);

    if (!currentUserMessages) return null;

    return (
        <div>THis is message page</div>
        );
}
 
export default Message;