import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions, createExercisePrescription } from "../../../store/exerciseRx";
import { getPatientLists } from "../../../store/patientList";
import { useHistory, useParams } from "react-router-dom";
import './ExerciseRxForm.css';

function ExercisePrescriptionForm({ exercisePrescription, patientLists, formType}) {
    
    const clinicianId = useSelector((state) => state.session.user?.id);
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [patientId, setPatientId] = useState('');
    const [dailyFrequency, setDailyFrequency] = useState(1);
    const [weeklyFrequency, setWeeklyFrequency] = useState(1);
    const [status, setStatus] = useState("current");
    const [errors, setErrors] = useState([]);
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
                        <h2 className='newExRx-TitleContainer'>Use this form to create a new Exercise Prescription.</h2> 
                    <div className='newExRxInnerContainer'>             
                            <div className='newExRxcontainer'>
                                <h3>
                                    <div className='newExRx-inputs'>
                                        <div className='input-container'>
                                            <div>
                                                <div className="createExRx-form-title">
                                                    <label  htmlFor='patientId'>Patient ID </label>
                                                </div>
                                                <div className="createExRx-form-section">
                                                        {hasSubmitted && !patientId && (
                                                            <label htmlFor='patientId' className='field-error'>Patient ID is required</label>
                                                        )}
                                                        <select 
                                                            className='createExRx-patientId-dropdown'
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
                                            </div>
                                            <div className="createExRx-form-title">
                                                <label htmlFor='title'>Enter a Title for this ExRx</label>
                                            </div>
                                            <div className="createExRx-form-section">   
                                                {hasSubmitted && !title && (
                                                <label htmlFor='title' className='field-error'>Title is required</label>
                                                )}
                                                <input 
                                                    type="text"
                                                    placeholder="eg. 'Hamstring Tear Protocol'"
                                                    required={true}
                                                    value={title}
                                                    onChange={updateTitle}
                                                />
                                            </div>     
                                        </div>
                                        <div className="createExRx-form-section">
                                                    <label  htmlFor='dailyFrequency'>How often should this prescription be performed? </label>
                                        </div>
                                        <div className="createExRx-frequency">        
                                            <span>    
                                                <div className="createExRx-form-section">   
                                                    {hasSubmitted && !dailyFrequency && (
                                                        <label htmlFor='status' className='field-error'>Daily Frequency is required</label>
                                                    )}
                                                    {/* <input
                                                        className='createExRxInput'
                                                        type="number"
                                                        placeholder="times per day"
                                                        // id="dailyFrequency"
                                                        // min={1}
                                                        // max={6}
                                                        value={dailyFrequency} 
                                                        onChange={updateDailyFrequency} 
                                                        required={true}
                                                    /> */}
                                                    <select 
                                                    className='createExRx-frequency-dropdown'
                                                    id="dailyFrequency" 
                                                    type="number"
                                                    onChange={updateDailyFrequency}  
                                                    required={true}
                                                    >
                                                        <option value={1}>1</option> 
                                                        <option value={2}>2</option> 
                                                        <option value={3}>3</option> 
                                                        <option value={4}>4</option> 
                                                        <option value={5}>5</option> 
                                                        <option value={6}>6</option> 
                                                    </select>
                                                     {dailyFrequency && dailyFrequency >= 2 &&(<span> times per day</span>)}
                                                     {dailyFrequency && dailyFrequency === 1 &&(<span> time per day</span>)}
                                                </div>
                                            </span>
                                            <span>
                                                <div className="createExRx-form-section">
                                                    <label  htmlFor='weeklyFrequency'></label>
                                                
                                                    {hasSubmitted && !weeklyFrequency && (
                                                        <label htmlFor='status' className='field-error'>Weekly Frequency is required</label>
                                                    )}
                                                    {/* <input
                                                        className='createExRxInput'
                                                        type="number"
                                                        placeholder="days per week"
                                                        // id="weeklyFrequency" 
                                                        // min={1}
                                                        // max={7}
                                                        value={weeklyFrequency}
                                                        onChange={updateWeeklyFrequency} 
                                                        required={true}
                                                    />  */}
                                                    <select 
                                                    className='createExRx-frequency-dropdown'
                                                    id="weeklyFrequency" 
                                                    type="number"
                                                    onChange={updateWeeklyFrequency}  
                                                    required={true}
                                                    >
                                                        <option value={1}>1</option> 
                                                        <option value={2}>2</option> 
                                                        <option value={3}>3</option> 
                                                        <option value={4}>4</option> 
                                                        <option value={5}>5</option> 
                                                        <option value={6}>6</option> 
                                                        <option value={7}>7</option> 
                                                    </select>
                                                     {weeklyFrequency && weeklyFrequency >= 2 &&(<span> days per week</span>)}
                                                     {weeklyFrequency && weeklyFrequency === 1 &&(<span> day per week</span>)}
                                                </div>
                                            </span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <div className="createExRx-form-section">
                                                <label  htmlFor='status'>ExRx Status </label>
                                            </div>
                                            <div className="createExRx-form-section">
                                                {hasSubmitted && !status && (
                                                    <label htmlFor='status' className='field-error'>Status is required</label>
                                                )}
                                                <select 
                                                    className='createExRx-status-dropdown'
                                                    id="status" 
                                                    onChange={updateStatus} 
                                                    required={true}
                                                >
                                                    <option value={"current"}>current</option>
                                                    <option value={"completed"}>completed</option> 
                                                </select>
                                            </div>
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