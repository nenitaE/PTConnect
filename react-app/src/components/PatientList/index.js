import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientList, getPatientLists} from "../../store/patientLists";
import DeleteTaskerTaskTypeModal from "../DeleteTaskerTaskTypeModal";
import { useModal } from "../../context/Modal";
import './PatientList.css'

const PatientList = () => {
    


    return (  
        <div>This is patient list page</div>
    );
}
 
export default PatientList;