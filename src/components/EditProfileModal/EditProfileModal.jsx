import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { editProfile } from "../../utils/api";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, isLoading, setCurrentUser }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
    formValid: false,
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
        formValid: false,
      });
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    editProfile(values)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch(console.error);
  }
  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitValid={values.formValid}
      buttonText={isLoading ? "Saving..." : "Save Changes"}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Avatar
        <input
          name="avatar"
          type="url"
          id="imageURL"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
