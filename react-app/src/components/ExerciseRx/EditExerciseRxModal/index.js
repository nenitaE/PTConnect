import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from '../../../context/Modal'; 
import { updateExercisePrescription, getExercisePrescription,getExercisePrescriptions } from '../../../store/exerciseRx';

const EditExerciseRxModal = ({exercisePrescriptionId}) => {
    console.log("🚀 ~ file: index.js:8 ~ EditExerciseRxModal ~ exercisePrescriptionId:", exercisePrescriptionId)
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getExercisePrescription(exercisePrescriptionId))
    }, [dispatch, exercisePrescriptionId]);
    
    const currExercisePrescription = useSelector((state) => state.exercisePrescription.exercisePrescription);
    console.log("🚀 ~ file: index.js:18 ~ EditExerciseRxModal ~ currExercisePrescription:", currExercisePrescription)
    const patientId = currExercisePrescription.patientId
    console.log("🚀 ~ file: index.js:20 ~ EditExerciseRxModal ~ patientId:", patientId)
    const clinicianId = useSelector((state) => state.session.user?.id);
    console.log("🚀 ~ file: index.js:22 ~ EditExerciseRxModal ~ clinicianId:", clinicianId)
    const exercises = useSelector((state) => currExercisePrescription.exercises);
    console.log("🚀 ~ file: index.js:24 ~ EditExerciseRxModal ~ exercises:", exercises)
    
    const [title, setTitle] = useState(currExercisePrescription.title);
    console.log("🚀 ~ file: index.js:25 ~ EditExerciseRxModal ~ title:", title)
    const [dailyFrequency, setDailyFrequency] = useState(currExercisePrescription.dailyFrequency);
    console.log("🚀 ~ file: index.js:27 ~ EditExerciseRxModal ~ dailyFrequency:", dailyFrequency)
    const [weeklyFrequency, setWeeklyFrequency] = useState(currExercisePrescription.weeklyFrequency);
    console.log("🚀 ~ file: index.js:29 ~ EditExerciseRxModal ~ weeklyFrequency:", weeklyFrequency)
    const [status, setStatus] = useState("current");
    console.log("🚀 ~ file: index.js:29 ~ EditExerciseRxModal ~ status:", status)
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);
    
    console.log("🚀 ~ file: index.js:40 ~ useEffect ~ currExercisePrescription:", currExercisePrescription)
    console.log("🚀 ~ file: index.js:41 ~ useEffect ~ exercisePrescriptionId:", exercisePrescriptionId)
    
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
        const errors = {};
        if (!dailyFrequency) {
            errors.dailyFrequency = "Daily Frequency is required."
        }
        // if (6 <= dailyFrequency <= 0) {
        //     errors.dailyFrequency = 'Must enter a daily Frequency between 1 and 6.'
        // }
        if (!weeklyFrequency) {
            errors.weeklyFrequency = "Weekly Frequency is required."
        }
        // if (8 <= weeklyFrequency <= 0) {
        //     errors.weeklyFrequency = 'Must enter a weekly Frequency between 1 and 7.'
        // }
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
            "patientId": patientId,
            "exercises": exercises
        }
        console.log("🚀 ~ file: index.js:76 ~ handleSubmit ~ currentData:", currentData)

        
        const exercisePrescriptionData = {
            "title": title,
            "dailyFrequency": dailyFrequency,
            "weeklyFrequency": weeklyFrequency,
            "status": status
        }
        console.log("🚀 ~ file: index.js:83 ~ handleSubmit ~ exercisePrescriptionData:", exercisePrescriptionData)
        
        const finalData = {
            ...currentData,
            ...exercisePrescriptionData
        } 
        console.log("🚀 ~ file: index.js:91 ~ handleSubmit ~ finalData:", finalData)

        const editedExercisePrescription = await dispatch(updateExercisePrescription(exercisePrescriptionId, finalData))
        
        if (editedExercisePrescription) {
            console.log("**********line 99 editModal")
            dispatch(getExercisePrescriptions())
            .then(closeModal)
            .then(history.push('/exercisePrescriptions/current'))            
        } else {
            console.log("**********line 104 editModal")
            setErrors({ errors: editedExercisePrescription });
            closeModal();
        }
        
    }


    return ( 
        <div className='update-ExRx-container'>
            <h3 className="form-editExRx-description">Edit Exercise Prescription</h3>   
                <form className ='ExRx-form' onSubmit={handleSubmit} >      
                    <ul className="errors">
                        {errors.status && <li>{errors.title}</li>}
                        {errors.status && <li>{errors.dailyFrequency}</li>}
                        {errors.status && <li>{errors.weeklyFrequency}</li>}
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
                                value={dailyFrequency} 
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
                                <option>Select Status</option>
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
