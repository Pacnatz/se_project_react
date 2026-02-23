import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (e) => {
      // that's why you should have a `modal` class name in each modal to be able to universally handle the overlay click
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    const handleCloseBtn = (e) => {
      if (e.target.classList.contains("modal__close-btn")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);
    document.addEventListener("mousedown", handleCloseBtn);

    // don't forget to remove both listeners in the clean up function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
      document.removeEventListener("mousedown", handleCloseBtn);
    };
  }, [isOpen, onClose]); // watch isOpen to add the listeners only when the modal is open
}

export default useModalClose;
