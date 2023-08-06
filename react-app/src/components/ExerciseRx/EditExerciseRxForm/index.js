import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercisePrescription, getExercisePrescriptions, updateExercisePrescription } from "../../../store/exerciseRx";
import { useHistory, useParams } from "react-router-dom";
import './EditExerciseRxForm.css';

function EditExercisePrescriptionForm() {
    const { exercisePrescriptionId } = useParams();

    //Get Ex Rx by Id
    const dispatch = useDispatch();
    let hasErrors = false;
    useEffect(() => {
        dispatch(getExercisePrescription(exercisePrescriptionId))
    }, [dispatch, exercisePrescriptionId]);

    const exercisePrescription = useSelector((state) => state.exercisePrescription.exercisePrescription);
    const patientId = exercisePrescription.patientId
    const clinicianId = useSelector((state) => state.session.user?.id);
    const history = useHistory();
    const [title, setTitle] = useState(exercisePrescription.title);
    const [dailyFrequency, setDailyFrequency] = useState(exercisePrescription.dailyFrequency);
    const [weeklyFrequency, setWeeklyFrequency] = useState(exercisePrescription.weeklyFrequency);
    const [status, setStatus] = useState(exercisePrescription.status);
    const [dailyFrequencyError, setDailyFrequencyError] = useState([]);
    const [weeklyFrequencyError, setWeeklyFrequencyError] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDailyFrequency = (e) => setDailyFrequency(e.target.value);
    const updateWeeklyFrequency = (e) => setWeeklyFrequency(e.target.value);
    const updateStatus = (e) => setStatus(e.target.value);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

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

        // Set errors
      if (dailyFrequency.length <= 0){
        setDailyFrequencyError('Must enter a daily frequency to update');
        hasErrors = true;
      } else if (6 <= dailyFrequency <= 0){
            setDailyFrequencyError('Must enter a daily Frequency between 1 and 6.');
            hasErrors = true;
      } else {
        setDailyFrequencyError('');
      }
      if (weeklyFrequency.length <= 0){
        setWeeklyFrequencyError('Must enter a weekly frequency to update');
        hasErrors = true;
      } else if (8 <= weeklyFrequency <= 0){
            setWeeklyFrequencyError('Must enter a weekly Frequency between 1 and 7.');
            hasErrors = true;
      } else {
        setWeeklyFrequencyError('');
      }
    
      // Disable form submission if errors are present
      if (hasErrors) {
        return;
      }

        //dispatch the edited form data
        const editedExercisePrescription = await dispatch(updateExercisePrescription(exercisePrescriptionId, finalData))
        if (editedExercisePrescription) {
            history.push('/exercisePrescriptions/current');
            dispatch(getExercisePrescriptions)
        }
    }


    return (
        <div className='update-ExRx-container'>
       
          <form className ='ExRx-form' onSubmit={handleSubmit} >      
                      <h3 className="form-editExRx-description">Use This Form To Edit Your ExRx</h3>  
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
                              <input className="updateExRxBtn" type="submit" />
          </form>
      </div>

    )
}

export default EditExercisePrescriptionForm