import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions, createExercisePrescription } from "../../../store/exerciseRx";
import { useHistory, useParams } from "react-router-dom";
import './ExerciseRxForm.css';

function ExercisePrescriptionForm({ exercisePrescription, formType}) {
    console.log("🚀 ~ file: index.js:8 ~ ExercisePrescriptionForm ~ exercisePrescription:", exercisePrescription)

    
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
        history.push('/exercisePrescriptions/current')
        if (newData) {
            setErrors(newData);
        } else {
            history.push('/exercisePrescriptions/current')
        }
    }
    if (!clinicianId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)

    return (
        <div className='newexRxFormContainer'>
            <form className='exRxForm' onSubmit={handleSubmit}>
                    <h2>{formType}</h2>
                    <div className='newexRxInnerContainer'>
                            <h3 className='newexRx-TitleContainer'>Use this form to create a new Exercise Prescription.</h3>              
                            <div className='newexRxcontainer'>
                                    <div className='newexRx-inputs'>
                                        <div className='input-container'>
                                            <label htmlFor='title'>Enter a Title for this ExRx</label>
                                            
                                            <input 
                                                type="text"
                                                placeholder="title"
                                                required={true}
                                                value={title}
                                                onChange={updateTitle}
                                            />
                                        </div>
                                        <div>
                                            <label  htmlFor='dailyFrequency'>ExRx Daily Frequency </label>
                                                {hasSubmitted && !dailyFrequency && (
                                                    <label htmlFor='status' className='field-error'>Daily Frequency is required</label>
                                                )}
                                            <input
                                                className='createExRxInput'
                                                type='number'
                                                id="dailyFrequency"
                                                maxLength={1} 
                                                onChange={updateDailyFrequency} 
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <label  htmlFor='weeklyFrequency'>ExRx Weekly Frequency </label>
                                                {hasSubmitted && !dailyFrequency && (
                                                    <label htmlFor='status' className='field-error'>Weekly Frequency is required</label>
                                                )}
                                                <input
                                                    className='createExRxInput'
                                                    type='number'
                                                    id="weeklyFrequency" 
                                                    maxLength={1}
                                                    onChange={updateWeeklyFrequency} 
                                                    required={true}
                                                />
                                        </div>
                                        <div>
                                            <label  htmlFor='status'>ExRx Status </label>
                                                {hasSubmitted && !status && (
                                                    <label htmlFor='status' className='field-error'>Status is required</label>
                                                )}
                                                <select 
                                                    className='createExRxdropdown'
                                                    id="status" 
                                                    onChange={updateStatus} 
                                                    required={true}
                                                >
                                                    <option value={"current"}>current</option>
                                                    <option value={"completed"}>completed</option> 
                                                </select>
                                        </div>
                                    </div>
                                        <ul className='form-validation-errors'>
                                            {errors.length > 0 && errors.map((error, idx) => (
                                                <li key={idx}>{error}</li>
                                            ))}
                                        </ul> 
                            </div> 
                    </div>

            </form>

        </div>
    )

}
export default ExercisePrescriptionForm;