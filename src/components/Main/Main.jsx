import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function Main({
  profileMenuOpened,
  weatherData,
  defaultCloths,
  handleCardClick,
  isWeatherDataLoading,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard
        profileMenuOpened={profileMenuOpened}
        weatherData={weatherData}
        isWeatherDataLoading={isWeatherDataLoading}
      />
      <section className="cards">
        <p className="cards__text">
          {isWeatherDataLoading
            ? ""
            : `Today is ${weatherData.temp[currentTemperatureUnit]}° ${currentTemperatureUnit} / You may want to wear:`}
        </p>
        <ul className="cards__list">
          {defaultCloths
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
