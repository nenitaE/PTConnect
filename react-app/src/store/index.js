import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import patientListReducer from './patientLists';
import exerciseReducer from './exercise';
import exercisePrescriptionReducer from './exerciseRx';
import messageReducer from './message';

const rootReducer = combineReducers({
  session,
  patientList: patientListReducer,
  exercisePrescription: exercisePrescriptionReducer,
  exercise: exerciseReducer,
  message: messageReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
