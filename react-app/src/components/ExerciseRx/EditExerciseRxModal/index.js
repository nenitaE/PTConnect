import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import * as exRxActions from '../../../store/exerciseRx';

const EditExerciseRxModal = ({exercisePrescriptionId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(exRxActions.getExercisePrescription(exercisePrescriptionId))
    }, [dispatch, exercisePrescriptionId]);
    
    const exercisePrescription = useSelector((state) => state.exercisePrescription.exercisePrescription);
    const patientId = exercisePrescription.patientId
    const clinicianId = useSelector((state) => state.session.user?.id);
    const history = useHistory();
    const [title, setTitle] = useState(exercisePrescription.title);
    const [dailyFrequency, setDailyFrequency] = useState(exercisePrescription.dailyFrequency);
    const [weeklyFrequency, setWeeklyFrequency] = useState(exercisePrescription.weeklyFrequency);
    const [status, setStatus] = useState(exercisePrescription.status);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    const currExercisePrescription = useSelector((state) => state.exercisePrescription.exercisePrescription);
        console.log("🚀 ~ file: index.js:33 ~ EditExerciseRxModal ~ currExercisePrescription:", currExercisePrescription)
 
    useEffect(() => {
        if (!currExercisePrescription) {
            dispatch(exRxActions.getExercisePrescription(exercisePrescriptionId))
        }
    }, [dispatch, currExercisePrescription, exercisePrescriptionId])
    
    useEffect(() => {
        if (currExercisePrescription) {
            setTitle(currExercisePrescription.title)
            setDailyFrequency(currExercisePrescription.dailyFrequency)
            setWeeklyFrequency(currExercisePrescription.weeklyFrequency)
            setStatus(currExercisePrescription.status)
        }
    }, [dispatch, 
        currExercisePrescription,
        currExercisePrescription.title,
        currExercisePrescription.dailyFrequency,
        currExercisePrescription.weeklyFrequency,
        currExercisePrescription.status
        ])  

    const handleSubmit = async (e) => {
        console.log("**********inside submit editModal")
        e.preventDefault();
        const errors = {};
        if (!dailyFrequency) {
            errors.dailyFrequency = "Daily Frequency is required."
        }
        if (6 <= dailyFrequency <= 0) {
            errors.dailyFrequency = 'Must enter a daily Frequency between 1 and 6.'
        }
        if (!weeklyFrequency) {
            errors.weeklyFrequency = "Weekly Frequency is required."
        }
        if (8 <= weeklyFrequency <= 0) {
            errors.weeklyFrequency = 'Must enter a weekly Frequency between 1 and 7.'
        }
        if (!title) {
            errors.title = "Title is required."
        }
        if (!status) {
            errors.status = "Status is required."
        }
        if (Object.keys(errors) && Object.keys(errors).length > 0) {
            return setErrors(errors);
        }

        const currentData = {
            "clinicianId": clinicianId,
            "patientId": patientId
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

        const editedExercisePrescription = await dispatch(exRxActions.updateExercisePrescription(exercisePrescriptionId, finalData))
        
        if (editedExercisePrescription) {
            console.log("**********line 92 editModal")
            dispatch(exRxActions.getExercisePrescriptions())
            .then(closeModal)
            .then(history.push('/exercisePrescriptions/current'))            
        } else {
            console.log("**********line 97 editModal")
            setErrors({ errors: editedExercisePrescription });
            closeModal();
        }
        
    }


    return ( 
        <div className='update-ExRx-container'>
            <h3 className="form-editExRx-description">Edit Exercise Prescription</h3>   
                <form className ='ExRx-form' onSubmit={handleSubmit} >      
                    <ul className="errors">
                        {errors.status && <li>{errors.status}</li>}
                        {errors.errors && errors.errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
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
                        <div className="editExRx-button-container">
                            <button className="updateExRxBtn" type="submit" >
                                Update Exercise Prescription
                            </button>
                            <button className="keepExRxBtn" type="button" onClick={closeModal}>
                                Keep Current Prescription (Don't Update)
                            </button>
                        </div>
                </form>
              </div>
     );
}
         
export default EditExerciseRxModal;
