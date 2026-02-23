import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { editProfile } from "../../utils/api";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onHandleSubmit }) => {
  const { currentUser, setCurrentUser, isLoading } =
    useContext(CurrentUserContext);

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
    const editProfileRequest = () => {
      return editProfile(values)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
        })
        .catch(console.error);
    };
    onHandleSubmit(editProfileRequest());
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
      <label htmlFor="editProfileName" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          id="editProfileName"
          className="modal__input"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="editProfileAvatar" className="modal__label">
        Avatar
        <input
          name="avatar"
          type="url"
          id="editProfileAvatar"
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
