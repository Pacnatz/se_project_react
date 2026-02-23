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
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  checkToken,
  getItems,
  addCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import { getToken, deleteToken } from "../../utils/token";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleSignupModal = () => {
    setActiveModal("signup");
  };
  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const onHandleSubmit = (request) => {
    setIsLoading(true);
    request
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const isAddOpen = activeModal == "add-garment";
  const isPreviewOpen = activeModal == "preview";
  const isDeleteOpen = activeModal == "delete";
  const isLoginOpen = activeModal == "login";
  const isSignupOpen = activeModal == "signup";
  const isEditProfileOpen = activeModal == "edit-profile";

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("token");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes arrays
        // the first argument is the card's id
        addCardLike({ itemId, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch(console.err)
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike({ itemId, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item)),
            );
          })
          .catch(console.error);
  };

  const handleSignOut = () => {
    deleteToken();
    setIsLoggedIn(false);
    setCurrentUser({});
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
            .catch((error) => {
              // Fallback to default cords
              console.error(error);
              getWeather(coordinates, apiKey)
                .then((data) => {
                  const filteredData = filterWeatherData(data);
                  setWeatherData(filteredData);
                })
                .catch(console.error)
                .finally(() => {
                  setIsWeatherDataLoading(false);
                });
            })
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
        },
      );
    } else {
      // Geolocation not supported, use default
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

    // Item API onload
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (getToken()) {
      // Check validity
      checkToken()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          handleSignOut();
          console.error(err);
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, isLoggedIn, isLoading }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              profileOpened={profileMenuOpened}
              onProfileButtonClick={setProfileMenuOpened}
              onAddButtonClick={handleAddClick}
              weatherData={weatherData}
              handleLoginModal={handleLoginModal}
              handleSignupModal={handleSignupModal}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isCheckingAuth={isCheckingAuth}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      handleEditProfileClick={handleEditProfileModal}
                      onCardLike={handleCardLike}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={isAddOpen}
            onClose={closeActiveModal}
            setClothingItems={setClothingItems}
            clothingItems={clothingItems}
            onHandleSubmit={onHandleSubmit}
          />
          <ItemModal
            isOpen={isPreviewOpen}
            onClose={closeActiveModal}
            card={selectedCard}
            handleDeleteModal={handleDeleteModal}
          />
          <DeleteModal
            isOpen={isDeleteOpen}
            card={selectedCard}
            onClose={closeActiveModal}
            onHandleSubmit={onHandleSubmit}
            setClothingItems={setClothingItems}
            clothingItems={clothingItems}
          />
          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeActiveModal}
            altModal={handleSignupModal}
            setIsLoggedIn={setIsLoggedIn}
            onHandleSubmit={onHandleSubmit}
          />
          <SignupModal
            isOpen={isSignupOpen}
            onClose={closeActiveModal}
            altModal={handleLoginModal}
            setIsLoggedIn={setIsLoggedIn}
            onHandleSubmit={onHandleSubmit}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeActiveModal}
            onHandleSubmit={onHandleSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
