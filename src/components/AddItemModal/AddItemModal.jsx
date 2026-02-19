import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onClose, onAddItem, isLoading }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
    formValid: false,
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values)
      .then(() => {
        setValues(defaultValues);
      })
      .catch(console.error);
  }
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitValid={values.formValid}
      isLoading={isLoading ? "Adding..." : "Add garment"}
    >
      <label htmlFor="name" className="modal__label">
        Name
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
        Image URL
        <input
          name="imageUrl"
          type="url"
          id="imageURL"
          className="modal__input"
          placeholder="Image URL"
          value={values.imageUrl}
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
