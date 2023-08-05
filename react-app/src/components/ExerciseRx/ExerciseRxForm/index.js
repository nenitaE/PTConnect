import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions, createExercisePrescription } from "../../../store/exerciseRx";
import { useHistory, useParams } from "react-router-dom";
import './ExerciseRxForm.css';

function ExercisePrescriptionForm({ exercisePrescription, formType}) {
    
    
    
    const patientId = exercisePrescription.patientId
    const clinicianId = useSelector((state) => state.session.user?.id);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [dailyFrequency, setDailyFrequency] = useState('');
    const [weeklyFrequency, setWeeklyFrequency] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    const dispatch = useDispatch();
    useEffect(() => {
        const data = dispatch(getExercisePrescriptions())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const exercisePrescription = {
            clinicianId,
            patientId,
            title,
            dailyFrequency,
            weeklyFrequency,
            status
        }
        const newData = await dispatch(createExercisePrescription(exercisePrescription))
        if (newData.id) {
            setErrors(newData.errors);
            let exercisePrescriptionId = newData.id;
            dispatch(getExercisePrescriptions(exercisePrescriptionId))
            history.push('/exercisePrescriptions/current')
        } else {
            alert('Exercise Prescription already exists.')
        }
    }
        if (!clinicianId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)



    return (
        <div className="createExRxContainer">Create ExRx Form</div>
    )

}
export default ExercisePrescriptionForm;