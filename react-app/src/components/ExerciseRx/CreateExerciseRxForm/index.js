import ExercisePrescriptionForm from "../ExerciseRxForm";

const CreateExercisePrescriptionForm = () => {
  const exercisePrescription = {
    clinicianId: '', 
    patientId: '',
    title: '',
    dailyFrequency: '',
    weeklyFrequency: '',
    status: ''
};
  

  return (
    <ExercisePrescriptionForm exercisePrescription={exercisePrescription} formType="Create A New Exercise Prescription" />
  );
}

export default CreateExercisePrescriptionForm;