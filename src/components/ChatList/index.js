import React from "react";
import "./styles.scss";

const ChatList = ({ selectedChat, chats, userEmail, selectedChatIndex }) => {

  if (chats.length > 0) {
    return chats.map((chat, index) => {
      return (
        <>
          <div
            key={index}
            className={
              selectedChatIndex === index
                ? "conversation-active"
                : "conversation"
            }
            onClick={() => selectedChat(index)}
          >
            <div className="conversation-img">
              {chat.users
                .filter((_user) => _user !== userEmail)[0]
                .charAt(0)
                .toUpperCase()}
            </div>
            <div className="title-text">
              {chat.users.filter((_user) => _user !== userEmail)[0]}
            </div>
            <div className="conversation-message">
              {chats[index].messages[chats[index].messages.length - 1].message}
            </div>
          </div>
        </>
      );
    });
  } else {
    return <div className="conversation-list"></div>;
  }
};

export default ChatList;
