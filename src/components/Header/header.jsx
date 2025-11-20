import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-location">June 15, New York</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="header__avatar-img"
        />
      </div>
    </header>
  );
}

export default Header;
