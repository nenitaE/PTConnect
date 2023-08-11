import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/user";
import { getAllPatientLists } from "../../../store/patientList";
import { useModal } from "../../../context/Modal";
import ConnectPatientListModal from "./ConnectPatientListModal";
import './PatientDashboard.css'



const PatientDashboard = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const patientId = useSelector((state) => state.session.user.id);
    const email = useSelector((state) => state.session.user.email);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isConnected, setIsConnected] = useState(true);
    const {setModalContent} = useModal();
    useEffect(() => {
        dispatch(getAllPatientLists())
        // dispatch(getUserClinicians())
        dispatch(getUser(1))
    }, [dispatch])

    let patientLists = useSelector(state => state.patientList.patientLists);
    console.log("🚀 ~ file: index.js:26 ~ PatientDashboard ~ patientLists:", patientLists)
    
    useEffect(() => {
        if (!patientLists) {
            return
        } else {
            const connectedPatient = patientLists.filter(patientList => patientList.patientId === patientId)
            if (connectedPatient) setIsConnected(false)
        }
    }, [patientLists, isConnected, patientId])
    console.log("🚀 ~ file: index.js:35 ~ PatientDashboard ~ isConnected:", isConnected)

    

    const clinician = useSelector(state => state.user.user);
    if (!clinician) return null;

    const patientList = {
        clinicianId: 1,
        patientId,
        email,
        status: "pending"
    }

    const openConnectPatientListModal = (patientList) => {        
        setModalContent(<ConnectPatientListModal patientList={patientList}/>)
    }



    return ( 
        <div className="patient-dash-root">
            <div className="patient-dash-background">
                <div className="patient-dash-outer-container">
                    <div className="patient-dash-empty-left-container"></div>
                        <div className="patient-dash-right-container">
                            <div className="patient-dash-right-inner">
                                <div className="meet-clinicians">
                                    <div className="patient-dash-title">
                                        <h1 className="pdTitle">Meet Our Featured Physical Therapist: Dr. {clinician.firstName}</h1>
                                        <div className="clinician-image-container">
                                        <img src={clinician.profileImage} alt="clinician-profileImage" width="150" className="clinician-profile-image"/>
                                        </div>
                                    </div>
                                    <div className="clinician-data">
                                        
                                        <h4 className="pDprofile">Dr. {clinician.firstName} graduated with great distinction from the Belmont University Doctor of Physical Therapy Program in 2008 and is a Fellow of the American Academy of Orthopedic Manual Therapists. She has worked in outpatient orthopedic clinics since 2008 and currently works as an outpatient Clinical Specialist at Kaiser Permanente in San Diego California.</h4>
                                    </div>
                                        {isConnected || (<div className="PLcreate-button-container">
                                            <button className="patient-dashboard-submit" onClick={() => openConnectPatientListModal(patientList)}>I want to get connected!</button>
                                        </div>)}
                                    {hasSubmitted && <ul>"Congratulations!  You are now connected with Dr. Demo.  
                                        Please wait for Dr. Demo to activate your request and prescribe your 
                                        first Exercise Prescription."
                                    </ul>}

                                </div>

                            </div>
                        </div>
                </div>
            </div>
        </div>
     );
}
 
export default PatientDashboard;