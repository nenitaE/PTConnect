import React, { useState, useEffect } from 'react';
import { exerciseOptions, fetchExercises } from '../../utilities/fetchExercise ';
import ExerciseTile from './ExerciseTile';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
    console.log(bodyPart, "bodyPart******************")
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

    //add pagination here
    if (!exercises.length) return "Loading...";
    return ( 
        <div className="exerciseContainer">
            <div className="exercise-tile-container">
            {exercises && exercises.map((exercise, idx) => (
                <ExerciseTile key={idx} exercise={exercise} />
            ))}
            </div>
        </div>
     );
}
 
export default Exercises;