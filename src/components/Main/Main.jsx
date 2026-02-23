import "./Main.css";
import { useContext, useEffect } from "react";
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
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { isLoggedIn } = useContext(CurrentUserContext);

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
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={isLoggedIn ? onCardLike : null}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
