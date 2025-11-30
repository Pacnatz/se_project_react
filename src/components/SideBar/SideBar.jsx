import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__user-text">
          <p className="sidebar__username">Terrence Tegegne</p>
          <button type="button" className="sidebar__change-profile-btn">
            Change profile data
          </button>
          <button className="sidebar__logout-btn">Log out</button>
        </div>
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="sidebar__avatar-img"
        />
      </div>
    </aside>
  );
}

export default SideBar;
