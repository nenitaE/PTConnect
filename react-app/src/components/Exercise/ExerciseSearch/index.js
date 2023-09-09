import React, { useState } from 'react';

import SelectExercise from '../SelectExercise';

const ExerciseSearch = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('back');

    return ( 
        <div className="exercise-search-container">
            <SelectExercise setExercises={setExercises} exercises={exercises} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        </div>

     );
}
 
export default ExerciseSearch;