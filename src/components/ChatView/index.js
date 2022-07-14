import React, { useEffect, useRef } from "react";

const ChatView = ({ chat, userEmail }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [chat]);

  if (chat === undefined) {
    return <div className="chat-message-list"></div>;
  } else {
    return (
      <div className="chat-message-list">
        {chat.messages.map((msg, index) => {
          return (
            <div>
              {msg.sender === userEmail ? (
                <div
                  key={index}
                  className={
                    msg.sender === userEmail
                      ? "user-msg-container"
                      : "friend-msg-container"
                  }
                >
                  <div className="user-sent">{msg.message}</div>
                  <div className="user-avatar">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="friend-avatar">
                    {chat.users
                      .filter((_user) => _user !== userEmail)[0]
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="friend-sent">{msg.message}</div>
                </div>
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
    );
  }
};

export default ChatView;
