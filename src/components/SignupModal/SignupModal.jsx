import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { register } from "../../utils/auth";

function SignupModal({ isOpen, onClose, altModal }) {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
    formValid: false,
  };
  const [showError, setShowError] = useState(false);
  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    register(values)
      .then((data) => {
        setShowError(false);
        onClose();
        console.log(data);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setShowError(true);
      });
    setValues(defaultValues); // Clear the entry
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
      <label htmlFor="signup-email" className="modal__label">
        Email*
        <input
          name="email"
          type="email"
          id="signup-email"
          placeholder="Email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password*
        <input
          name="password"
          type="password"
          id="signup-password"
          placeholder="Password"
          className="modal__input"
          value={values.password}
          minLength={2}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signup-name" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          id="signup-name"
          placeholder="Name"
          className="modal__input"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="signup-avatar" className="modal__label">
        Avatar URL*
        <input
          name="avatar"
          type="url"
          id="signup-avatar"
          placeholder="Avatar URL"
          className="modal__input"
          value={values.avatar}
          onChange={handleChange}
          required
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
