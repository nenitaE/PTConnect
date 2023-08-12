import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions, createExercisePrescription } from "../../../store/exerciseRx";
import { getPatientLists } from "../../../store/patientList";
import { useHistory, useParams } from "react-router-dom";
import './ExerciseRxForm.css';

function ExercisePrescriptionForm({ exercisePrescription, patientLists, formType}) {
    console.log("🚀 ~ file: index.js:9 ~ ExercisePrescriptionForm ~ patientLists:", patientLists)
    console.log("🚀 ~ file: index.js:8 ~ ExercisePrescriptionForm ~ exercisePrescription:", exercisePrescription)
    
    const clinicianId = useSelector((state) => state.session.user?.id);
    console.log("🚀 ~ file: index.js:14 ~ ExercisePrescriptionForm ~ clinicianId:", clinicianId)
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [patientId, setPatientId] = useState('');
    console.log("🚀 ~ file: index.js:17 ~ ExercisePrescriptionForm ~ title:", title)
    const [dailyFrequency, setDailyFrequency] = useState('');
    console.log("🚀 ~ file: index.js:19 ~ ExercisePrescriptionForm ~ dailyFrequency:", dailyFrequency)
    const [weeklyFrequency, setWeeklyFrequency] = useState('');
    console.log("🚀 ~ file: index.js:21 ~ ExercisePrescriptionForm ~ weeklyFrequency:", weeklyFrequency)
    const [status, setStatus] = useState("current");
    console.log("🚀 ~ file: index.js:23 ~ ExercisePrescriptionForm ~ status:", status)
    const [errors, setErrors] = useState([]);
    console.log("🚀 ~ file: index.js:25 ~ ExercisePrescriptionForm ~ errors:", errors)
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updatePatientId = (e) => setPatientId(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExercisePrescriptions())
    }, [dispatch]);

    if (!patientLists) {
        return (
            <h1>Loading...</h1>
        )
    }
    let patientListsArr = Object.values(patientLists)
    console.log("🚀 ~ file: index.js:42 ~ ExercisePrescriptionForm ~ patientListsArr:", patientListsArr)

    const handleSubmit = async (e) => {
        console.log("****INSIDE HANDLE SUBMIT CREATE EXRX")
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
        console.log("🚀 ~ file: index.js:62 ~ handleSubmit ~ exercisePrescription:", exercisePrescription)
        console.log("🚀 ~ file: index.js:62 ~ handleSubmit ~ newData:", newData)
        
        if (newData.id) {
            let exercisePrescriptionId = newData.id;
            dispatch(getExercisePrescription(exercisePrescriptionId))
            history.push('/exercisePrescriptions/current')
        } else {
            setErrors(newData);
            return alert('Invalid Form Input.')
        }
    }
    if (!clinicianId) return (<div><p>You must be a logged in clinician to access this page</p>{history.push('/')}</div>)

    const handleAlert = async (e) => {
        alert("Feature coming soon!");
    }



    return (
        <div className='newExRxFormContainer'>
            <form className='ExRxForm' onSubmit={handleSubmit}>
                    <h2>{formType}</h2>
                    <div className='newExRxInnerContainer'>
                            <h3 className='newExRx-TitleContainer'>Use this form to create a new Exercise Prescription.</h3>              
                            <div className='newExRxcontainer'>
                                <h3>
                                    <div className='newExRx-inputs'>
                                        <div className='input-container'>
                                            <div>
                                                <label  htmlFor='patientId'>Patient ID </label>
                                                    {hasSubmitted && !patientId && (
                                                        <label htmlFor='patientId' className='field-error'>Patient ID is required</label>
                                                    )}
                                                    <select 
                                                        className='createExRxdropdown'
                                                        id="patientId" 
                                                        type="number"
                                                        onChange={updatePatientId} 
                                                        required={true}
                                                    >
                                                    <option>Which of your patients is this prescription for?</option> 
                                                    {(patientLists && patientLists.map(list => (    
                                                        <option value={list.patientId}>PatientID: {list.patientId}, Email: {list.email}</option>)))}
                                                    </select>
                                            </div>
                                            {hasSubmitted && !title && (
                                            <label htmlFor='title'>Enter a Title for this ExRx</label>
                                            )}
                                            <input 
                                                type="text"
                                                placeholder="Name this exercise prescription (eg. 'Hamstring Tear')"
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
                                                type="number"
                                                placeholder="How many times per day should this prescription be performed?"
                                                // id="dailyFrequency"
                                                // min={1}
                                                // max={6}
                                                value={dailyFrequency} 
                                                onChange={updateDailyFrequency} 
                                                required={true}
                                            />
                                        </div>
                                        <div>
                                            <label  htmlFor='weeklyFrequency'>ExRx Weekly Frequency </label>
                                                {hasSubmitted && !weeklyFrequency && (
                                                    <label htmlFor='status' className='field-error'>Weekly Frequency is required</label>
                                                )}
                                                <input
                                                    className='createExRxInput'
                                                    type="number"
                                                    placeholder="How many days per week should this prescription be performed?"
                                                    // id="weeklyFrequency" 
                                                    // min={1}
                                                    // max={7}
                                                    value={weeklyFrequency}
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
                                        
                                        
                                        <div className="add-exercises-container">
                                            <button onClick={(handleAlert)} className="exRx-button">Select Exercises</button>
                                            
                                        </div>
                                    </div>
                                        <div className="ExRxcreate-button-container">
                                                <input className='newPLSubmitBTN' type="submit" value={formType} />
                                        </div>
                                </h3>
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