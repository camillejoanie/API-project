// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import SpotDetailPage from "./components/SpotDetailsPage/SpotDetailPage";
import CreateSpotForm from "./components/CreateNewSpot/CreateSpotForm";
import ManageSpots from "./components/ManageSpotsPage/ManageSpots";
import UpdateSpotForm from "./components/UpdateSpotForm/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage}/> 
          <Route exact path="/spots/create" component={CreateSpotForm} />
          <Route exact path="/spot/:spotId/update" component={UpdateSpotForm} />
          <Route path="/spot/:spotId" component={SpotDetailPage} />
          <Route exact path="/spots/current" component={ManageSpots} />
        </Switch>
      )}
    </>
  );
}

export default App;
