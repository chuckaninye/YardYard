import React from "react";
import ReactDom from "react-dom";
import "./styles.scss";

const Modal = ({
  open,
  children,
  onClose,
  productName,
  productImage,
  productPrice,
  profileImg,
  profileName,
}) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        {children}
        <div className="modal-info">
          <img className="modal-img" src={productImage} />
          <div className="modal-details">
            <h4 className="modal-name">{productName}</h4>
            <h4 className="modal-price"> ${productPrice}</h4>
          </div>
        </div>
        <textarea className="message" rows="8" cols="35" />
        <div className="modal-btns">
          <a className="skip-btn">Skip Message</a>
          <a className="cancel-btn"  onClick={onClose}>
            Cancel
          </a>
          <a className="send-btn">Send</a>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
