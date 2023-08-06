import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPatientLists } from '../../../store/patientList'; 


const AllPatientLists = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] =useState(false)
    const patientLists = useSelector(state => state.patientList);
    
    useEffect(() => {
        dispatch(getAllPatientLists()).then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!patientLists) return null;

    const allPatientLists = Object.values(patientLists);



    return ( 
        <div className='PL-container'>
            {isLoaded && 
                allPatientLists.map(patientList => (
                    <div className='PL-tiles' key={patientList.id}>
                    {/* <Link to={`/patientLists/${patientList.id}`} key={patientList.id}>
                        <PatientListTile patientList={patientList} />
                    </Link> */}
                    {patientList.email}
                    </div>
            ))}
        </div>

     );
}
 
export default AllPatientLists;