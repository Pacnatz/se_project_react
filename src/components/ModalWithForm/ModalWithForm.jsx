import "./ModalWithForm.css";

function ModalWithForm({ children, title, buttonText, activeModal, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`modal ${activeModal === "add-garmet" && "modal_open"}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <form className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={onClose}
            type="button"
            className="modal__close-btn"
          ></button>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
