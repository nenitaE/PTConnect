import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientList, getPatientLists} from "../../store/patientList";
import { getUsers } from "../../store/user";
import DeletePatientListModal from "./DeletePatientListModal";
import { useModal } from "../../context/Modal";
import './PatientList.css'

const PatientList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const[isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userIsClinician = useSelector(state => state.session.user.isClinician)
    console.log("🚀 ~ file: index.js:16 ~ PatientList ~ userIsClinician:", userIsClinician)
    const {setModalContent} = useModal();
    useEffect(() => {
        dispatch(getPatientLists())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    let patientLists = useSelector(state => state.patientList.PatientLists);
    console.log("🚀 ~ file: index.js:24 ~ PatientList ~ patientLists :", patientLists )
    // patientLists = Object.values(patientLists)

    // patientLists = patientLists.filter(patientList=> patientList.clinicianId === sessionUser.id)
    
     
    

    // let currentPatientLists = useSelector(state => state.patientList.PatientLists);
    // console.log("🚀 ~ file: index.js:23 ~ PatientList ~ currentPatientLists:", currentPatientLists)
    if (!patientLists) return null;
    
    const openDeletePatientListModal = (patientListId) => {
        setModalContent(<DeletePatientListModal patientListId={patientListId}/>)
    }


    return (  
        <div className="patientList-container">
            <h2 className="pListTitle">Current Patients:</h2>
                <div className="create-new-PL-container">
                        {!sessionUser || (
                            <div  className='create-new-PL'>
                                <a href="/patientLists/new">
                                    <button className="create-new-PListBttn">
                                        Connect a new patient to your list
                                    </button>
                                </a>
                            </div>
                        )}
                </div>

                <div className="pL-inner-container">
                    {!userIsClinician && <p>You have no current patients</p> || 
                    (patientLists.map(list => (
                        <div className="indiv-pList-container" key={list.id}>
                            <span className="pList-data">
                                <h4>Patient:</h4> {list.email} 
                            </span>
                            <span className="pList-data">
                                <h4>Status:</h4> {list.status}
                                <span>   </span>
                                <span >
                                    { <a href={`/patientLists/${list.id}/edit`}>
                                    <button className='editPLBtn'>Edit</button>
                                    </a> }
                                </span>
                            </span>
                            <span className='medium-PLBtn'>
                                    <button className="patientList-button" onClick={() => openDeletePatientListModal(list.id)}>Delete Patient</button>
                            </span>
                                
                            <span className='medium-PLBtn'>
                                    {<a href={`/patientLists/${list.id}/edit`}>
                                    <button className="patientList-button">View Exercise Rx</button>
                                    </a>}
                            </span>
                                
                                
                        </div>
                    )))}
                </div>
                
        </div>
    );
}
 
export default PatientList;