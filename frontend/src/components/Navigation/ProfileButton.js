import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
// import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const heartIcon = process.env.PUBLIC_URL + "/images/fullheart.svg";

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="button-container" onClick={openMenu}>
        <i className="fas fa-bars" />
        {user ? (
          <div className="heart-profile-icon">
            <img src={heartIcon} alt="Heart" className="heart-profile" />
            <span className="user-initial">{user.firstName[0]}</span>
          </div>
        ) : (
          <div className="circle-profile">
            <i className="fas fa-user-circle" />
          </div>
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-info-in-profile-button">
              <div className="username-in-profile-button">
                <li>Hello, {user.firstName}</li>
              </div>
              <li>{user.email}</li>
            </div>
            <div className="manage-spots-in-profile-button">
              <li>
                <Link to={"/spots/current"} onClick={closeMenu}>
                  Manage Spots
                </Link>
              </li>
            </div>
            <div className="logout-button">
              <li>
                <button className="logout-in-profile-button" onClick={logout}>
                  Log Out
                </button>
              </li>
            </div>
          </>
        ) : (
          <div className="login-signup-menu">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
