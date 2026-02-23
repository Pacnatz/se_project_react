import { useContext } from "react";
import "./DeleteModal.css";
import { deleteCard } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function DeleteModal({
  isOpen,
  onClose,
  card,
  onHandleSubmit,
  setClothingItems,
  clothingItems,
}) {
  const { isLoading } = useContext(CurrentUserContext);

  function handleDelete() {
    const deleteItem = () => {
      return deleteCard(card._id)
        .then(() => {
          setClothingItems(
            clothingItems.filter((item) => item._id !== card._id),
          );
        })
        .catch(console.error);
    };

    onHandleSubmit(deleteItem());
  }
  return (
    <div
      onClick={onClose}
      className={`delete-modal ${isOpen ? "modal_open" : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="delete-modal__content"
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <p className="delete-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={handleDelete}
          type="button"
          className="delete-modal__confirm"
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="delete-modal__cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
