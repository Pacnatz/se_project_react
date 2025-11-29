import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title = "New garment",
  buttonText = "Add garment",
  name = "add-garment",
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen ? "modal_open" : ""} modal_type_${name}`}
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
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
