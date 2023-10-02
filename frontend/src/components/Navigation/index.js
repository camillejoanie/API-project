import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="home">
          <NavLink exact to="/">
            <img src={process.env.PUBLIC_URL + "/images/newairbnboba_logo.png"} alt="AirBnBOBA logo" className="logo"></img>
          </NavLink>
        </li>
        <div className="nav-right">
          {sessionUser ? <Link to="/spots/new" className="create-link">Book Out Your Boba</Link> : null}
          {isLoaded && (
            <li className="nav-profile-create">
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
