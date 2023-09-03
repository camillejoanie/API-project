// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import sessionReducer from "./session";
import landingPageReducer from './landingPage';
import spotsReducer from './spots';
import spotDetailReducer from './spotDetailPage';
import manageSpotsReducer from './manageSpots';
import updateSpotReducer from './updateSpot';
import authReducer from './auth';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  session: sessionReducer,
  landingPage: landingPageReducer,
  spots: spotsReducer,
  spotDetailPage: spotDetailReducer,
  manageSpots: manageSpotsReducer,
  updateSpot: updateSpotReducer,
  auth: authReducer,
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