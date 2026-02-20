import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  profileMenuOpened,
  weatherData,
  clothingItems,
  handleCardClick,
  isWeatherDataLoading,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);
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
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              if (item.owner === 0) {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                );
              }
              return (
                item.owner === currentUser._id && (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                )
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
