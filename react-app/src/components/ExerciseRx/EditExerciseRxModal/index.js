import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { updateExercisePrescription, getExercisePrescription,getExercisePrescriptions } from '../../../store/exerciseRx';
import './EditExerciseRxModal.css';

const EditExerciseRxModal = ({exercisePrescriptionId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getExercisePrescription(exercisePrescriptionId))
    }, [dispatch, exercisePrescriptionId]);
    
    const currExercisePrescription = useSelector((state) => state.exercisePrescription.exercisePrescription);
    const patientId = currExercisePrescription.patientId
    const clinicianId = useSelector((state) => state.session.user?.id);
    const exercises = useSelector((state) => currExercisePrescription.exercises);
    
    const [title, setTitle] = useState(currExercisePrescription.title);
    const [dailyFrequency, setDailyFrequency] = useState(currExercisePrescription.dailyFrequency);
    const [weeklyFrequency, setWeeklyFrequency] = useState(currExercisePrescription.weeklyFrequency);
    const [status, setStatus] = useState("current");
    const [titleError, setTitleError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [dailyError, setDailyError] = useState('');
    const [weeklyError, setWeeklyError] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);
    let hasErrors = false;
    
    useEffect(() => {
        if (!currExercisePrescription) {
            dispatch(getExercisePrescription(exercisePrescriptionId))
        }
    }, [dispatch, currExercisePrescription, exercisePrescriptionId])
    
    useEffect(() => {
        if (currExercisePrescription) {
            setTitle(currExercisePrescription.title)
            setDailyFrequency(currExercisePrescription.dailyFrequency)
            setWeeklyFrequency(currExercisePrescription.weeklyFrequency)
            setStatus(currExercisePrescription.status)
        }
    }, [dispatch, currExercisePrescription])  

    const handleSubmit = async (e) => {
        console.log("**********inside handle submit editRXModal")
        e.preventDefault();
        setHasSubmitted(true);
        const errors = {};
        if (!dailyFrequency) {
            errors.dailyFrequency = "Daily Frequency is required."
            setDailyError("Daily Frequency is required.")
            hasErrors = true;
        }
        if (dailyFrequency <= 0 || dailyFrequency >=7 ) {
            errors.dailyFrequency = 'Must enter a daily Frequency between 1 and 6.'
            setDailyError('Must enter a daily Frequency between 1 and 6.')
            hasErrors = true;
        }
        if (!weeklyFrequency) {
            errors.weeklyFrequency = "Weekly Frequency is required."
            setWeeklyError("Weekly Frequency is required.")
            hasErrors = true;
        }
        if (weeklyFrequency <= 0 || weeklyFrequency >= 8) {
            errors.weeklyFrequency = 'Must enter a weekly Frequency between 1 and 7.'
            setWeeklyError('Must enter a weekly Frequency between 1 and 7.')
            hasErrors = true;
        }
        if (!title) {
            errors.title = "Title is required."
            setTitleError("Title is required.")
            hasErrors = true;
        }
        if (title.length>20) {
            errors.title = "Title can not exceed 20 characters."
            setTitleError("Title can not exceed 20 characters.")
            hasErrors = true;
        }
        if (!status) {
            errors.status = "Status is required."
            setStatusError("Status is required.")
            hasErrors = true;
        }
        if (Object.keys(errors) && Object.keys(errors).length > 0) {
            return setErrors(errors);
        }

        // Disable form submission if errors are present
        if (hasErrors) {
            return;
        }

        const currentData = {
            "clinicianId": clinicianId,
            "patientId": patientId,
            "exercises": exercises
        }
        
        const exercisePrescriptionData = {
            "title": title,
            "dailyFrequency": dailyFrequency,
            "weeklyFrequency": weeklyFrequency,
            "status": status
        }
        
        const finalData = {
            ...currentData,
            ...exercisePrescriptionData
        } 
        const editedExercisePrescription = await dispatch(updateExercisePrescription(exercisePrescriptionId, finalData))
        console.log("🚀 ~ file: index.js:114 ~ handleSubmit ~ editedExercisePrescription:", editedExercisePrescription)
        
        if (editedExercisePrescription.id) {
            console.log("**********line 99 editModal")
            dispatch(getExercisePrescriptions())
            .then(closeModal)
            .then(history.push('/exercisePrescriptions/current'))            
        } else {
            console.log("**********line 104 editModal")
            setErrors(editedExercisePrescription);
            alert('Invalid Form Input.')
            closeModal();
        }
        
    }


    return ( 
        <div className='update-ExRx-container'>
            <h2 className="form-editExRx-description">Edit Exercise Prescription For PatientID: {patientId}</h2>   
                <form className ='ExRx-form' onSubmit={handleSubmit} >      
                    <div className='edit-input-container'>
                        <h3>
                            <div className="editExRx-title">
                                <span className="exRx-title">
                                    <label htmlFor='title'>Enter a Title for this ExRx</label>
                                        {hasSubmitted && !title && (
                                            <label htmlFor='status' className='field-error'>Title is required</label>
                                        )}
                                        <input 
                                            type="text"
                                            placeholder="title"
                                            maxLength={40}
                                            required={true}
                                            value={title}
                                            onChange={updateTitle}
                                        />
                                </span>
                                        <p className="field-error">
                                        {titleError &&   <p className="error"> 
                                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                                            {titleError}
                                                        </p>}
                                        </p>
                                
                            </div>
                            <div className="create-form-frequency">
                                <span className="editExRx-daily">
                                    <span>
                                        <label  htmlFor='dailyFrequency'>Daily Frequency </label>
                                            {hasSubmitted && !dailyFrequency && (
                                                <label htmlFor='status' className='field-error'>Daily Frequency is required</label>
                                            )}
                                            <input
                                                className='createExRxInput'
                                                type='number'
                                                id="dailyFrequency"
                                                min={1}
                                                max={6}
                                                value={dailyFrequency} 
                                                onChange={updateDailyFrequency} 
                                                required={true}
                                            />
                                            
                                    </span>
                                    <p className="field-error">
                                        {dailyError &&   <p className="error"> 
                                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                                            {dailyError}
                                                        </p>}
                                    </p>
                                </span>
                                <span className='padding5'></span>
                                <span className="editExRx-weekly">    
                                    <span>   
                                        <label  htmlFor='weeklyFrequency'>Weekly Frequency </label>
                                            {hasSubmitted && !weeklyFrequency && (
                                                <label htmlFor='status' className='field-error'>Weekly Frequency is required</label>
                                            )}
                                            <input
                                                className='createExRxInput'
                                                type='number'
                                                id="weeklyFrequency" 
                                                min={1}
                                                max={7}
                                                value={weeklyFrequency}
                                                onChange={updateWeeklyFrequency} 
                                                required={true}
                                            />
                                    </span> 
                                    <p className="field-error">
                                        {weeklyError &&   <p className="error"> 
                                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                                            {weeklyError}
                                                        </p>}
                                    </p>
                                </span>
                                </div>
                                <div className='editExRx-status'>
                                    <div></div>
                                    <div>
                                        <label  htmlFor='status'>ExRx Status </label>
                                        {hasSubmitted && !status && (
                                            <label htmlFor='status' className='field-error'>Status is required</label>
                                        )}
                                        <p>
                                            <select 
                                                className='editExRx-dropdown'
                                                id="status" 
                                                onChange={updateStatus} 
                                                required={true}
                                            >
                                                <option value={"current"}>current</option>
                                                <option value={"completed"}>completed</option> 
                                            </select>
                                            <p className="field-error">
                                            {statusError &&   <span className="error"> 
                                                                <i className="fa-solid fa-triangle-exclamation"></i>
                                                                {statusError}
                                                            </span>}
                                            </p>
                                        </p>
                                    </div>
                                    <div></div>
                                </div>
                        </h3>        
                    </div>
                                <div className="validation-container-editexRx">    
                                    <ul className='form-validation-errors'>
                                        {errors.length > 0 && errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                </div>    
                                <div className="editExRx-button-container">
                                    <span>
                                        <button className="login-button" type="button" onClick={closeModal}>
                                            Keep Current Prescription
                                        </button>
                                    </span>
                                    <span className='padding5'></span>
                                    <span>
                                        <button className="signup-button" type="submit" >
                                            Update Exercise Prescription
                                        </button>
                                    </span>                                
                                </div>
                </form>
              </div>
     );
}
         
export default EditExerciseRxModal;
