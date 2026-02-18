import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { login } from "../../utils/auth";

function LoginModal({ isOpen, onClose, altModal }) {
  const defaultValues = {
    email: "",
    password: "",
    formValid: false,
  };
  const [showError, setShowError] = useState(false);
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    // Call our API to check if it matches
    login(values)
      .then((data) => {
        setShowError(false);
        onClose();
        console.log(data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setShowError(true);
        console.log(showError);
      });
    setValues(defaultValues); // Clear the entry
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
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          id="login-email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          id="login-password"
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
