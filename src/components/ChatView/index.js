import React, { useState, useEffect } from "react";

const ChatView = ({ chat, userEmail }) => {
  useEffect(() => {}, []);

  if (chat === undefined) {
    return <div className="chat-message-list"></div>;
  } else {
    return (
      <div className="chat-message-list">
        {chat.messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                msg.sender === userEmail ? "user-msg-container" : "friend-msg-container"
              }
            >
              <div
                className={
                  msg.sender === userEmail ? "user-avatar" : "friend-avatar"
                }
              >
                {msg.sender === userEmail
                  ? userEmail.charAt(0).toUpperCase()
                  : chat.users
                      .filter((_user) => _user !== userEmail)[0]
                      .charAt(0)
                      .toUpperCase()}
              </div>
              <div
                className={
                  msg.sender === userEmail ? "user-sent" : "friend-sent"
                }
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ChatView;
