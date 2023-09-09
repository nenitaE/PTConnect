import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ExerciseTile.css'



const ExerciseTile = ({exercise, clickedExercises, setClickedExercises}) => {
    console.log("🚀 ~ file: index.js:9 ~ ExerciseTile ~ clickedExercises:", clickedExercises)
    const exerciseId = exercise.id;
        console.log("🚀 ~ file: index.js:10 ~ ExerciseTile ~ exerciseId:", exerciseId)
       console.log(typeof(exerciseId)) 


    //Func to add selected exercises to array
    const [isChecked, setIsChecked] = useState(false);
    console.log("🚀 ~ file: index.js:17 ~ ExerciseTile ~ isChecked:", isChecked)
    const [selected, setSelected] = useState([]);
    console.log("🚀 ~ file: index.js:18 ~ ExerciseTile ~ selected:", selected)
    

    useEffect(() => {
        if (selected.length) {
            setClickedExercises([...clickedExercises, selected])
            console.log("🚀 ~ file: index.js:19 ~ useEffect ~ selected:", selected)
            console.log("🚀 ~ file: index.js:19 ~ useEffect ~ clickedExercises:", clickedExercises)
        }
    },[selected])
    
    const handleChecked = (e) => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setSelected(e.target.value)
    }
}

    
    return ( 
        <div className="ex-tile-outer-container">
            <div className="ex-tile-inner">  
                <div className="ex-title">
                    <h2 className='ex-tile-name'>{exercise.name}</h2>
                    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
                    <div>Body Part: {exercise.bodyPart}</div>
                    <div>Target Muscle: {exercise.target}</div>
                    <div>Exercise Id: {exercise.id}</div>
                    <div className="selected-exercise">
                        <input
                        className="select-ex-Box"
                        type="checkbox"
                        id="checkbox"
                        checked={isChecked}
                        value={exercise.id}
                        onChange={handleChecked}
                        /> <span className="selected-ex-Box-text"> Click to select this exercise</span>
                    </div>
                </div>
            </div>  
        </div>
     );
}
 
export default ExerciseTile;