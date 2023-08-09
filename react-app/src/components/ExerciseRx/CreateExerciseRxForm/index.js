import ExercisePrescriptionForm from "../ExerciseRxForm";

const CreateExercisePrescriptionForm = () => {
  const exercisePrescription = {
    clinicianId: '', 
    patientId: '',
    title: '',
    status: '',
    dailyFrequency: '',
    weeklyFrequency: '' 
};
  

  return (
    <ExercisePrescriptionForm exercisePrescription={exercisePrescription} formType="Create A New Exercise Prescription" />
  );
}

export default CreateExercisePrescriptionForm;