import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`modal__item ${isOpen ? "modal_open" : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_image"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__name">{card.name}</p>
          <p className="modal__temp">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
