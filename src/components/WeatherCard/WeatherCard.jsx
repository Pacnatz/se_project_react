import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ profileMenuOpened, weatherData, isWeatherDataLoading }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  let weatherOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // Default weathercard
  if (weatherOption === undefined) {
    weatherOption = weatherOptions[0];
  }

  return (
    <section
      className={`weather-card ${
        profileMenuOpened ? "weather-card_hidden" : ""
      }`}
    >
      <p className="weather-card__temp">
        {weatherData?.temp[currentTemperatureUnit]}
        &deg;{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing: ${weatherOption?.day ? "day" : "night"} ${
          weatherOption?.condition
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
