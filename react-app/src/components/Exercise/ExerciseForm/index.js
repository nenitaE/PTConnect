import React, { useState } from 'react';
import Exercises from '../Exercise';
import SearchExercise from '../SearchExercise/SearchExercise';

const ExerciseForm = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');

    return ( 
        <div className="exercise-form-container">
            <SearchExercise setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
            <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
        </div>
    );
}
 
export default ExerciseForm;