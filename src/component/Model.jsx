import React from "react";

const Modal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal">
        <h2>Modal Content</h2>
        <div>Hello</div>
      </div>
    </div>
  );
};

export default Modal;
