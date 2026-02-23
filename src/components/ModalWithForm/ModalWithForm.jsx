import "./ModalWithForm.css";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  children,
  title = "New garment",
  buttonText = "Add garment",
  altText = "",
  isOpen,
  onClose,
  onSubmit,
  isSubmitValid,
  altModal,
}) {
  useModalClose(isOpen, onClose);
  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen ? "modal_open" : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <form onSubmit={onSubmit} className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={onClose}
            type="button"
            className="modal__close-btn"
          />
          {children}
          <div className="modal__submit-container">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={!isSubmitValid}
            >
              {buttonText}
            </button>
            <button
              onClick={altModal}
              type="button"
              className="modal__alt-btn"
              hidden={!altText}
            >
              {`or ${altText}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
