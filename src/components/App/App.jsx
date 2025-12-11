import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addCard, deleteCard } from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const onAddItem = (inputValues) => {
    return addCard(inputValues)
      .then((newItem) => {
        setIsLoading(true);
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteItemHandler = (id) => {
    deleteCard(id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item.id != id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const isAddOpen = activeModal == "add-garment";
  const isPreviewOpen = activeModal == "preview";
  const isDeleteOpen = activeModal == "delete";

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    setIsWeatherDataLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather({ latitude, longitude }, apiKey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error)
            .finally(() => {
              setIsWeatherDataLoading(false);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default coordinates
          getWeather(coordinates, apiKey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error)
            .finally(() => {
              setIsWeatherDataLoading(false);
            });
        }
      );
    } else {
      // Geolocation not supported, use default
      setIsWeatherDataLoading(false);
      getWeather(coordinates, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }

    // Item API onload
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            profileOpened={profileMenuOpened}
            onProfileButtonClick={setProfileMenuOpened}
            onAddButtonClick={handleAddClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  profileMenuOpened={profileMenuOpened}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  isWeatherDataLoading={isWeatherDataLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={isAddOpen}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
          isLoading={isLoading}
        />
        <ItemModal
          isOpen={isPreviewOpen}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteModal={handleDeleteModal}
        />
        <DeleteModal
          isOpen={isDeleteOpen}
          card={selectedCard}
          onClose={closeActiveModal}
          deleteItemHandler={deleteItemHandler}
          buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
