import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useEffect } from "react";

function WeatherCard({ profileMenuOpened, weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img
        src={weatherOption[0]?.url}
        alt={`Card showing: ${weatherOption[0]?.day ? "day" : "night"} ${
          weatherOption[0]?.condition
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
