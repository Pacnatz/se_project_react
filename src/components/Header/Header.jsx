import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  profileOpened,
  onProfileButtonClick,
  onAddButtonClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const openProfile = () => {
    onProfileButtonClick(true);
  };

  const closeProfile = () => {
    onProfileButtonClick(false);
  };

  const location = useLocation();
  // Used to style at a specific route
  const isProfile = location.pathname === "/profile";

  return (
    <header className={profileOpened ? "header_open" : "header"}>
      <div
        className={
          isProfile
            ? "header__menu-container_type_profile"
            : profileOpened
            ? "header__menu-container_open"
            : "header__menu-container"
        }
      >
        <div
          className={
            isProfile ? "header__menu-top_type_profile" : "header__menu-top"
          }
        >
          <Link to="/">
            <img src={logo} alt="WTWR Logo" className="header__logo" />
          </Link>
        </div>
        <p
          className={
            isProfile
              ? "header__date-location_type_profile"
              : "header__date-location"
          }
        >
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <button onClick={openProfile} className="header__menu-bar"></button>
      <div
        className={
          profileOpened
            ? "header__profile-container_type_open"
            : "header__profile-container"
        }
      >
        <button
          onClick={closeProfile}
          type="button"
          className="header__close-btn"
        ></button>
        <ToggleSwitch />
        <button
          onClick={onAddButtonClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <NavLink className="header__profile-navlink" to="/profile">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar-img"
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
