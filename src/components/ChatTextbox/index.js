import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatTextbox = ({ submitMessageFn }) => {
  const [chatText, setChatText] = useState(null);
  const inputRef = useRef();

  const userClickedInput = () => console.log("Clicked input");

  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      inputRef.current.value = null;
    }
  };

  const messageValid = (txt) => txt && txt.replace(/ /g, "").length;

  return (
    <div className="chat-textbox-wrap">
      <div className="chat-textbox">
        <input
          className="chat-input"
          placeholder="Type your message.."
          onKeyPress={(e) => {
            e.which === 13 ? submitMessage() : setChatText(e.target.value);
          }}
          onFocus={() => userClickedInput()}
          ref={inputRef}
        />
        <div className="chat-icon">
          <FontAwesomeIcon
            icon="arrow-circle-up"
            className="send-icon"
            onClick={() => submitMessage()}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatTextbox;
