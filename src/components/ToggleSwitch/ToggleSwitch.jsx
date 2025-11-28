import "./ToggleSwitch.css";

function ToggleSwitch() {
  return (
    <label htmlFor="toggle-switch" className="toggle-switch">
      <input
        type="checkbox"
        id="toggle-switch"
        className="toggle-switch__checkbox"
      />
      <div className="toggle-switch__thumb"></div>
      <div className="toggle-switch__text">
        <p className="toggle-switch__text_F">F</p>
        <p className="toggle-switch__text_C">C</p>
      </div>
    </label>
  );
}

export default ToggleSwitch;
