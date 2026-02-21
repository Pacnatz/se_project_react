import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser.name}</p>
        {currentUser.avatar !== "" ? (
          <img
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
            className="sidebar__avatar-img"
          />
        ) : (
          <div alt="Default avatar" className="sidebar__default-avatar">
            {currentUser.name[0]}
          </div>
        )}
      </div>
      <button
        onClick={handleEditProfileClick}
        type="button"
        className="sidebar__change-profile-btn"
      >
        Change profile data
      </button>
      <button
        onClick={handleSignOut}
        type="button"
        className="sidebar__logout-btn"
      >
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
