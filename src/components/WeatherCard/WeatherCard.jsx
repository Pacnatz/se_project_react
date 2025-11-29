import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext, useEffect } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ profileMenuOpened, weatherData, isWeatherDataLoading }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  let weatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // Default weathercard
  if (weatherOption.length === 0) {
    weatherOption = [weatherOptions[0]];
  }

  return (
    <section
      className={`weather-card ${
        profileMenuOpened ? "weather-card_hidden" : ""
      }`}
    >
      <p className="weather-card__temp">
        {isWeatherDataLoading ? "" : weatherData.temp[currentTemperatureUnit]}
        &deg;{currentTemperatureUnit}
      </p>
      <img
        src={isWeatherDataLoading ? "" : weatherOption[0]?.url}
        alt={`Card showing: ${weatherOption[0]?.day ? "day" : "night"} ${
          weatherOption[0]?.condition
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
