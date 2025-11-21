import { act, useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: "999", C: "999" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const openProfileMenu = () => {
    setProfileMenuOpened(true);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpened(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather({ latitude, longitude }, APIkey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default coordinates
          getWeather(coordinates, APIkey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error);
        }
      );
    } else {
      // Geolocation not supported, use default
      getWeather(coordinates, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          profileOpened={profileMenuOpened}
          onProfileButtonClick={setProfileMenuOpened}
          onAddButtonClick={handleAddClick}
          weatherData={weatherData}
        />
        <Main
          profileMenuOpened={profileMenuOpened}
          weatherData={weatherData}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="url"
            id="imageURL"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="temperature"
              id="hot"
              type="radio"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="temperature"
              id="warm"
              type="radio"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="temperature"
              id="cold"
              type="radio"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
