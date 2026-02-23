import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { addCard } from "../../utils/api";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const AddItemModal = ({
  isOpen,
  onClose,
  setClothingItems,
  clothingItems,
  onHandleSubmit,
}) => {
  const { currentUser, isLoading } = useContext(CurrentUserContext);

  const defaultValues = {
    clothingItemName: "",
    clothingItemURL: "",
    weather: "",
    formValid: false,
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const addItem = () => {
      return addCard({ ...values, owner: currentUser._id })
        .then((newItem) => {
          setClothingItems([newItem, ...clothingItems]);
          setValues(defaultValues);
        })
        .catch(console.error);
    };
    onHandleSubmit(addItem());
  }
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitValid={values.formValid}
      isLoading={isLoading ? "Adding..." : "Add garment"}
    >
      <label htmlFor="clothingItemName" className="modal__label">
        Name
        <input
          name="clothingItemName"
          type="text"
          id="clothingItemName"
          className="modal__input"
          placeholder="Name"
          value={values.clothingItemName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="clothingItemURL" className="modal__label">
        Image URL
        <input
          name="clothingItemURL"
          type="url"
          id="clothingItemURL"
          className="modal__input"
          placeholder="Image URL"
          value={values.clothingItemURL}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            value="hot"
            onChange={handleChange}
            required
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
