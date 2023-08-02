import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientList } from '../../../store/patientLists';
import EditPatientListForm from '../EditPatientListForm';

const UpdatePatientListForm = () => {
    //populate patientList from Redux store
    const { patientListId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const data = dispatch(getPatientList(patientListId));
    }, [dispatch, patientListId]);

    const patientListToEdit = useSelector((state) => state.patientList)
    console.log("🚀 ~ file: index.js:16 ~ UpdatePatientListForm ~ patientListToEdit:", patientListToEdit)
    return (
        <EditPatientListForm patientList={patientListToEdit} formType="Update Patient List" />
    );
}

export default UpdatePatientListForm;