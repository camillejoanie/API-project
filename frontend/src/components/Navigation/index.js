// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <img src={process.env.PUBLIC_URL + "/images/newairbnboba_logo.png"} alt="AirBnBOBA logo" className="logo"></img>
        </NavLink>
      </li>
      <li className="nav-right">
        {isLoaded && (
          <div className="nav-profile-create">
            <NavLink exact to="/spots/create">
              Book Out Your Boba
            </NavLink>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
