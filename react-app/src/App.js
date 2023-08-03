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
          <Route exact path="/messages/current">
            <Message/>
          </Route>
          <Route exact path="/patientLists/:patientListId/edit">
            <EditPatientListForm/>
          </Route>
          <Route exact path="/patientLists/current">
            <PatientList/>
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
