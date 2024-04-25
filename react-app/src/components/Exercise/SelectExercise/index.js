import React, { useState, useEffect } from 'react';
import { exerciseOptions, fetchExercises } from '../../../utilities/fetchExercise ';
import ExerciseTile from '../ExerciseTile';
import "./SelectExercise.css"

const SelectExercise = ({ exercises, setExercises, bodyPart, setBodyPart }) => {

    
    const [currPage, setCurrPage] = useState(1);
    const [displayPerPage] = useState(8);
    const [clickedExercises, setClickedExercises] = useState([])
    const [confirmedExercises, setConfirmedExercises] = useState([])
    const updateExercises = (e) => setExercises(e.target.value);
    const updateBodyPart = (e) => setBodyPart(e.target.value);


    useEffect(() => {
        const fetchExerciseData = async () => {
            let exercisesData = [];
            if (bodyPart){
                exercisesData = await fetchExercises(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
            }
            setExercises(exercisesData);
        };
        fetchExerciseData();
    }, [bodyPart, setExercises]);

    //Get index range for curr page
    const idxOfLast = currPage * displayPerPage;
    const idxOfFirst = idxOfLast - displayPerPage;
    const currExercises = exercises?.slice(idxOfFirst, idxOfLast);

    //Func to update curr page
    const handlePaginate = (pageNum) => {
        setCurrPage(pageNum)
    }

    const handleRemove = (idx) => {
      const newClickedExercises = [...clickedExercises]
      newClickedExercises.splice(idx, 1)
      setClickedExercises(newClickedExercises)
    }

    const handleConfirm = () => {
      setConfirmedExercises(clickedExercises)
      setClickedExercises([])
    }

    return ( 
        <div className="select-exercise-outer">
          <h1 className='exercise-title'>Create An Exercise Protocol</h1>
            <div className='ex-search-container'>
                <h3 className='exercise-title'>Select a body part to search:</h3>
                <select 
                    className='bodyparts-dropdown'
                    id="bodyparts" 
                    type="text"
                    onChange={updateBodyPart}
                    >
                    <option value={"back"}>Back</option>
                    <option value={"chest"}>Chest</option>
                    <option value={"lower arms"}>Lower Arms</option>
                    <option value={"lower legs"}>Lower Legs</option>
                    <option value={"upper arms"}>Upper Arms</option>
                    <option value={"upper legs"}>Upper Legs</option>
                    <option value={"neck"}>Neck</option>
                    <option value={"shoulders"}>Shoulders</option>
                </select>
                
            </div>
            <div className="clickedExercises">
              
                  <h2 className='exercise-title'>Selected Exercises: </h2>
                  {clickedExercises.map((clicked, idx) => (
                <span className='selected-ids' key={clicked} >{clicked}  <span className='remove-id-btn' key={idx} onClick={handleRemove}>remove</span></span>
                ))}
                <span className='confirm-ex-box'>
                    <button className="confirm-ex-button" onClick={handleConfirm}>
                        Confirm Selected Exercises
                    </button>
                </span>
            </div>
            <div className="exercise-tile-container">
                {currExercises && currExercises.map((exercise, idx) => (
                    <ExerciseTile key={exercise.id} exercise={exercise} clickedExercises={clickedExercises} setClickedExercises={setClickedExercises}/>
                ))}
            </div>
            <div className="paginate">
            {exercises.length > 8 && (
                <ul className="pagination">
                {Array.from({ length: Math.ceil(exercises.length / displayPerPage) }).map(
                  (page, index) => (
                    <li key={index} className="page-item">
                      <button
                        onClick={() => handlePaginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
            </div>
        </div>

     );
}
 
export default SelectExercise;