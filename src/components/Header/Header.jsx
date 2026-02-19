import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  profileOpened,
  onProfileButtonClick,
  onAddButtonClick,
  weatherData,
  handleLoginModal,
  handleSignupModal,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
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
        {/* Need to add a div*/}
        {isLoggedIn ? (
          <>
            <button
              onClick={onAddButtonClick}
              type="button"
              className="header__btn"
            >
              + Add clothes
            </button>
            <NavLink className="header__profile-navlink" to="/profile">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar !== "" ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.name}'s avatar`}
                    className="header__avatar-img"
                  />
                ) : (
                  <div alt="Default avatar" className="header__default-avatar">
                    {currentUser.name[0]}
                  </div>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <button onClick={handleSignupModal} className="header__btn">
              Sign up
            </button>
            <button onClick={handleLoginModal} className="header__btn">
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
