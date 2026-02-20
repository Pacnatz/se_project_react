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
import { checkToken, getItems, addCard, deleteCard } from "../../utils/api";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
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

  const onAddItem = (inputValues) => {
    setIsLoading(true);
    return addCard({ ...inputValues, owner: currentUser._id })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEditProfile = (inputValues) => {
    setIsLoading(true);
  };

  const deleteItemHandler = (id) => {
    deleteCard(id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id != id;
          }),
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
  const isLoginOpen = activeModal == "login";
  const isSignupOpen = activeModal == "signup";
  const isEditProfileOpen = activeModal == "edit-profile";

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
        },
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
    if (getToken()) {
      // Check validity
      checkToken()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setCurrentUser({});
          deleteToken();
          console.error(err);
        })
        .finally(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
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

  // TEST
  document.addEventListener("keydown", (e) => {
    if (e.key === "p") {
      console.log(currentUser);
    }
  });

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
                    clothingItems={
                      isLoggedIn ? clothingItems : defaultClothingItems
                    }
                    handleCardClick={handleCardClick}
                    isWeatherDataLoading={isWeatherDataLoading}
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
          <LoginModal
            isOpen={isLoginOpen}
            onClose={closeActiveModal}
            altModal={handleSignupModal}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
          <SignupModal
            isOpen={isSignupOpen}
            onClose={closeActiveModal}
            altModal={handleLoginModal}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={closeActiveModal}
            onEditProfile={onEditProfile}
            setCurrentUser={setCurrentUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
