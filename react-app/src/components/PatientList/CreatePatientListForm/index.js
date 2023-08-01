import PatientListForm from "../PatientListForm";

const CreatePatientListForm = () => {
  const patientList = {
    clinicianId: '', 
    patientId: '',
    email: '',
    status: ''
};
  

  return (
    <PatientListForm patientList={patientList} formType="Connect A New Patient" />
  );
}

export default CreatePatientListForm;