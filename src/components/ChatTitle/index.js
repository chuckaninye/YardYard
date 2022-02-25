import React, { useState } from "react";
import { auth, firestore } from "../../firebase/utils";

const ChatTitle = ({ chat, userEmail }) => {
  const [profileName, setProfileName] = useState();

  if (chat === undefined) {
    return <div className="chat-title"></div>;
  } else {
    firestore
      .collection("users")
      .doc(chat.usersUID.filter((users) => users !== auth.currentUser.uid)[0])
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setProfileName(snapshot.data().displayName);
        }
      });

    return <> Your conversation with {profileName}</>;
  }
};

export default ChatTitle;
