import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  profileMenuOpened,
  weatherData,
  defaultCloths,
  handleCardClick,
}) {
  return (
    <main>
      <WeatherCard
        profileMenuOpened={profileMenuOpened}
        weatherData={weatherData}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
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
