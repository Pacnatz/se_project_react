import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  handleCloseModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garmet" && "modal_open"}`}>
      <div className="modal__content">
        <form className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={handleCloseModal}
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
