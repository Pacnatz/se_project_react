import "./DeleteModal.css";

function DeleteModal({ isOpen, card, onClose, deleteItemHandler, buttonText }) {
  function handleDelete() {
    deleteItemHandler(card._id);
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
          {buttonText}
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
