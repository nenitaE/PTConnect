import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditPatientListForm from '../EditPatientListForm';

const UpdatePatientListForm = () => {
  //populate patientList from Redux store
  const { patientListId } = useParams();
  
  const patientList = useSelector((state) => (state.patientList.patientList));
  console.log("🚀 ~ file: index.js:10 ~ UpdatePatientListForm ~ patientList:", patientList)
//   const clinicianId = useSelector((state) => state.session.user?.id);
    
  
  return (
    <EditPatientListForm patientList={patientList} formType="Update Patient List" />
  );
}

export default UpdatePatientListForm;