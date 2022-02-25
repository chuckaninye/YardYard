import React, { useState, useEffect } from "react";
import ChatList from "../../components/ChatList";
import ChatView from "../../components/ChatView";
import ChatTitle from "../../components/ChatTitle";
import ChatTextbox from "../../components/ChatTextbox";
import firebase from "firebase";
import { auth, firestore } from "../../firebase/utils";
import { useHistory } from "react-router-dom";
import "./styles.scss";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  let [email, setEmail] = useState(null);
  const [chats, setChats] = useState([]);
  const history = useHistory();

  const selectChat = (chatIndex) => {
    setSelectedChat(chatIndex);
    console.log(chatIndex);
  };

  const submitMessage = (msg) => {
    const docKey = buildDocKey(chats[selectedChat].users.filter( _user => _user !== email)[0]);
    firestore.collection('chats').doc(docKey).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        sender: email,
        message: msg,
        timestamp: Date.now()
      }),
      receiverHasRead: false
    })
  }

  const buildDocKey = (friend) => {
    return [email, friend].sort().join(':');
  }

  const configChat = {
    chats,
    userEmail: email,
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        history.push("/login");
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

  return (
    <div className="body-container">
      <div className="chat-container">
        <div className="chat-search-container"></div>
        <div className="conversation-list">
          <ChatList
            selectedChat={selectChat}
            selectedChatIndex={selectedChat}
            {...configChat}
          />
        </div>
        <div className="new-message-container"></div>
        <div className="chat-title">
          <ChatTitle userEmail={email} chat={chats[selectedChat]} />
        </div>
        <div className="chat-message-list">
          <ChatView userEmail={email} chat={chats[selectedChat]} />
        </div>
        <div className="chat-form">
          <ChatTextbox submitMessageFn={submitMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
