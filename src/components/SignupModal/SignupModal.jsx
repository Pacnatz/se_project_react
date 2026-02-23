import { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { checkToken } from "../../utils/api";
import { login, register } from "../../utils/auth";
import { setToken, deleteToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SignupModal({
  isOpen,
  onClose,
  altModal,
  setIsLoggedIn,
  onHandleSubmit,
}) {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
    formValid: false,
  };
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [showError, setShowError] = useState(false);
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const registerRequest = () => {
      return register(values)
        .then(() => {
          setShowError(false);
          // Login Automatically
          login(values)
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
                  setIsLoggedIn(false);
                  setCurrentUser({});
                  deleteToken();
                });
            })
            .catch((error) => {
              console.error("Login failed:", error);
              setShowError(true);
            });
          onClose();
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          setShowError(true);
        });
    };
    onHandleSubmit(registerRequest());
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      altText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitValid={values.formValid}
      altModal={altModal}
    >
      <label htmlFor="signUpEmail" className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          id="signUpEmail"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signUpPassword" className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          id="signUpPassword"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          minLength={2}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signUpName" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          id="signUpName"
          placeholder="Name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signUpAvatar" className="modal__label">
        Avatar URL
        <input
          name="avatar"
          type="url"
          id="signUpAvatar"
          placeholder="Avatar URL"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <p className={`modal__error-message${showError ? "" : "_hidden"}`}>
        Registration was unsuccessful. Please check your email and password, and
        try again.
      </p>
    </ModalWithForm>
  );
}

export default SignupModal;
