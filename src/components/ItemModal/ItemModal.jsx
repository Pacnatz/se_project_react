import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onClose, card, handleDeleteModal }) {
  useModalClose(isOpen, onClose);
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal modal__item ${isOpen ? "modal_open" : ""}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-bar">
            <p className="modal__name">{card.name}</p>
            {isOwn && (
              <button
                type="button"
                onClick={handleDeleteModal}
                className="modal__delete-btn"
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__temp">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
