import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        id="toggle-switch"
        className="toggle-switch__checkbox"
      />
      <div className="toggle-switch__thumb"></div>
      <div className="toggle-switch__text">
        <p
          style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
          className="toggle-switch__text_F"
        >
          F
        </p>
        <p
          style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
          className="toggle-switch__text_C"
        >
          C
        </p>
      </div>
    </label>
  );
}

export default ToggleSwitch;
