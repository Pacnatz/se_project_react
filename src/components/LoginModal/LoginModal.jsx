import { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { checkToken } from "../../utils/api";
import { login } from "../../utils/auth";
import { setToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function LoginModal({
  isOpen,
  onClose,
  altModal,
  setIsLoggedIn,
  onHandleSubmit,
}) {
  const defaultValues = {
    email: "",
    password: "",
    formValid: false,
  };
  const [showError, setShowError] = useState(false);
  const { values, handleChange, setValues } = useForm(defaultValues);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    // Call our API to check if it matches
    const loginRequest = () => {
      return login(values)
        .then((data) => {
          setShowError(false);
          setToken(data.token);
          setValues(defaultValues); // Clear the entry
          checkToken()
            .then((user) => {
              setIsLoggedIn(true);
              setCurrentUser(user);
            })
            .catch((error) => {
              console.error("Error checking token:", error);
              deleteToken();
              setIsLoggedIn(false);
              setCurrentUser({});
            });
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setShowError(true);
        });
    };
    onHandleSubmit(loginRequest());
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      altText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitValid={values.formValid}
      altModal={altModal}
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          id="loginEmail"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          id="loginPassword"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          minLength={2}
          onChange={handleChange}
          required
        />
      </label>
      <p className={`modal__error-message${showError ? "" : "_hidden"}`}>
        Email or password is incorrect
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
