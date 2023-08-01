import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientLists, createPatientList} from "../../store/patientLists";
import './PatientListForm.css'

const PatientListForm = ({ patientList, formType}) => {
    const clinicianId = useSelector((state) => state.session.user?.id);
    console.log("🚀 ~ file: index.js:9 ~ PatientListForm ~ clinicianId:", clinicianId)
    const history = useHistory();

    const [] = useState("");
    const [] = 
    

    return (

    )

}

export default PatientListForm;