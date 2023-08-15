import { useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getPatientLists } from "../../../store/patientList"
import ExercisePrescriptionForm from "../ExerciseRxForm";

const CreateExercisePrescriptionForm = () => {
  const dispatch = useDispatch();
  const exercisePrescription = {
    clinicianId: '', 
    patientId: '',
    title: '',
    status: '',
    dailyFrequency: '',
    weeklyFrequency: '' 
  };
  useEffect(() => {
    dispatch(getPatientLists())
  }, [dispatch])
  
  let patientLists = useSelector(state => state.patientList.patientLists);
    
  return (
    <ExercisePrescriptionForm exercisePrescription={exercisePrescription} patientLists={patientLists} formType="Create New Exercise Prescription" />
  );
}

export default CreateExercisePrescriptionForm;