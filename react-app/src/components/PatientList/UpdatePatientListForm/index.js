import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientList } from '../../../store/patientList';
import EditPatientListForm from '../EditPatientListForm';

const UpdatePatientListForm = () => {
    //populate patientList from Redux store
    const { patientListId } = useParams();
    console.log("🚀 ~ file: index.js:10 ~ UpdatePatientListForm ~ patientListId :", patientListId )

    const patientListToEdit = useSelector((state) => state.patientLists)
    // const patientListToEdit = useSelector((state) => state.patientLists[patientListId])
    console.log("🚀 ~ file: index.js:16 ~ UpdatePatientListForm ~ patientListToEdit:", patientListToEdit)
    return (
        <EditPatientListForm patientList={patientListToEdit} formType="Update Patient List" />
    );
}

export default UpdatePatientListForm;