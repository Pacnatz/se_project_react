import { useState } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

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

  return (
    <header className={profileOpened ? "header_open" : "header"}>
      <div
        className={
          profileOpened
            ? "header__menu-container_type_close"
            : "header__menu-container"
        }
      >
        <div className="header__menu-top">
          <img src={logo} alt="WTWR Logo" className="header__logo" />
          <button onClick={openProfile} className="header__menu-bar"></button>
        </div>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
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
        <button
          onClick={onAddButtonClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="header__avatar-img"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
