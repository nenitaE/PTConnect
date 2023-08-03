import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientList, getPatientLists} from "../../store/patientList";
import { getUsers } from "../../store/user";
import DeletePatientListModal from "./DeletePatientListModal";
import { useModal } from "../../context/Modal";
import './PatientList.css'

const PatientList = () => {

    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    console.log("🚀 ~ file: index.js:16 ~ PatientList ~ userIsClinician:", userIsClinician)
    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    

        
    useEffect(() => {
        dispatch(getPatientLists())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    let currentPatientLists = useSelector(state => state.patientList.PatientLists);
    console.log("🚀 ~ file: index.js:23 ~ PatientList ~ currentPatientLists:", currentPatientLists)
    if (!currentPatientLists) return null;
    
    const openDeletePatientListModal = (patientListId) => {
        setModalContent(<DeletePatientListModal patientListId={patientListId}/>)
    }


    return (  
        <div className="patientList-container">
            <h2>Current Patients:</h2>
                {!userIsClinician && <p>You have no current patients</p> || 
                (currentPatientLists.map(list => (
                    <div className="individ-PL-container" key={list.id}>
                        <span>Patient: {list.email}</span> <span>Status: {list.status}</span>
                        <div>
                            <span className='deletePLBtn'>
                                <button className="patientList-button" onClick={() => openDeletePatientListModal(list.id)}>Delete</button>
                            </span>
                            <span> </span>
                            <span  className='editPLBtn'>
                                { <a href={`/patientLists/${list.id}/edit`}>
                                <button className="patientList-button">Edit</button>
                                </a> }
                            </span>
                        </div>
                    </div>
                )))}
                <div className="create-new-PL-container">
                    {!sessionUser || (
                        <div  className='create-new-PL'>
                            <a href="/patientLists/new">
                                <button className="create-new-PListBttn">
                                    <h3> Connect a new patient to your list </h3>
                                </button>
                            </a>
                        </div>
                    )}
                </div>
        </div>
    );
}
 
export default PatientList;