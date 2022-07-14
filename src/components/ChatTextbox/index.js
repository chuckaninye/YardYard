import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatTextbox = ({ submitMessageFn }) => {
  const [chatText, setChatText] = useState(null);
  const inputRef = useRef();

  const submitMessage = () => {
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      inputRef.current.value = null;
    }
  };

  const handleUserInput = (e) => {
    if (e.key === "Enter") {
      submitMessage()
    }
  };

  const handleChange = (e) => {
    setChatText(e.target.value)
  };

  const messageValid = (txt) => txt && txt.replace(/ /g, "").length;

  return (
    <div className="chat-textbox-wrap">
      <div className="chat-textbox">
        <input
          className="chat-input"
          placeholder="Type your message.."
          onKeyPress={(e) => handleUserInput(e)}
          onChange={(e) => handleChange(e)}
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
