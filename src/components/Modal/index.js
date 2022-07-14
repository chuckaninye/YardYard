import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import firebase from "firebase";
import { firestore } from "../../firebase/utils";
import "./styles.scss";

const Modal = ({
  open,
  onClose,
  productName,
  productImage,
  productPrice,
  profileName,
  profileEmail,
}) => {
  const [chatText, setChatText] = useState(null);
  const inputRef = useRef();
  let [email, setEmail] = useState(null);
  const [chats, setChats] = useState([]);

    useEffect(() => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
        } else {
          await firebase
            .firestore()
            .collection("chats")
            .where("users", "array-contains", user.email)
            .onSnapshot(async (res) => {
              const chats = res.docs.map((doc) => doc.data());
              setEmail(user.email);
              setChats(chats);
            });
        }
      });
    }, []);

    const buildDocKey = (friend) => {
      return [email, friend].sort().join(":");
    };

  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      inputRef.current.value = null;
    }
  };

  const submitMessageFn = (msg) => {
    const docKey = buildDocKey(
      profileEmail
    );
    firestore
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });

      onClose()
  }

  const handleUserInput = (e) => {
    if (e.key == "Enter") {
      submitMessage();
    }
  };

  const handleChange = (e) => {
    setChatText(e.target.value);
  };

  const messageValid = (txt) => txt && txt.replace(/ /g, "").length;

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-header">
          <h2>Send A Message To {profileName} </h2>
        </div>
        <div className="modal-info">
          <div className="modal-img">
            <img src={productImage} />
          </div>
          <div className="modal-details">
            <h4 className="modal-name">{productName}</h4>
            <h4 className="modal-price"> ${productPrice}</h4>
          </div>
        </div>
        <textarea
          className="message"
          rows="8"
          cols="35"
          onKeyPress={(e) => handleUserInput(e)}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
        />
        <div className="modal-btns">
          <a className="cancel-btn" onClick={onClose}>
            Cancel
          </a>
          <a className="send-btn" onClick={() => submitMessage()}>
            Send
          </a>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
