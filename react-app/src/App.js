import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import LoginSignup from "./components/HomePage/LoginSignup";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PatientList from "./components/PatientList";
import CreatePatientListForm from "./components/PatientList/CreatePatientListForm";
import EditPatientListForm from "./components/PatientList/EditPatientListForm";
import Message from "./components/Message";
import SentMessage from "./components/Message/SentMessage";
import CreateMessageForm from "./components/Message/CreateMessage";
import ExercisePrescription from "./components/ExerciseRx";
import Exercise from "./components/Exercise"
import EditExercisePrescriptionForm from "./components/ExerciseRx/EditExerciseRxForm";
import ExercisePrescriptionForm from "./components/ExerciseRx/ExerciseRxForm";
import ExercisePrescriptionDetails from "./components/ExerciseRx/ExerciseRxDetails";
import UpdatePatientListForm from "./components/PatientList/UpdatePatientListForm";
import AllPatientLists from "./components/PatientList/AllPatientList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true)).catch(() => setIsLoaded(false));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/loginSignup">
            <LoginSignup/>
          </Route>
          <Route exact path="/exercisePrescriptions/current">
            <ExercisePrescription/>
          </Route>
          <Route exact path="/exercisePrescriptions/new">
            <ExercisePrescriptionForm/>
          </Route>
          <Route exact path="/exercisePrescriptions/:exercisePrescriptionId/edit">
            <EditExercisePrescriptionForm/>
          </Route>
          <Route exact path="/exercisePrescriptions/:exercisePrescriptionId">
            <ExercisePrescriptionDetails/>
          </Route>
          <Route exact path="/exercises/current">
            <Exercise/>
          </Route>
          <Route exact path="/messages/current">
            <Message/>
          </Route>
          <Route exact path="/messages/sent">
            <SentMessage/>
          </Route>
          <Route exact path="/messages/new">
            <CreateMessageForm/>
          </Route>
          <Route exact path="/patientLists/:patientListId/edit">
            <UpdatePatientListForm/>
          </Route>
          <Route exact path="/patientLists/current">
            <PatientList/>
          </Route>
          <Route exact path="/patientLists/">
            <AllPatientLists/>
          </Route>
          <Route exact path="/patientLists/new">
            <CreatePatientListForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
