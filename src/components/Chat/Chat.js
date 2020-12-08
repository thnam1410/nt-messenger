import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import PhoneIcon from "@material-ui/icons/Phone";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import InfoIcon from "@material-ui/icons/Info";
import BubbleMessage from "../BubbleMessage/BubbleMessage";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { selectRoomId, selectRoomName } from "../../features/chatSlice";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase/firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const [message, setMessage] = useState("");
  const [listOfMessages, setListOfMessages] = useState([]);
  const user = useSelector(selectUser);
  const roomID = useSelector(selectRoomId);
  const roomName = useSelector(selectRoomName);

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message === null || message === "") {
      return;
    }
    db.collection("chats").doc(roomID).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: message,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setMessage("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };
  const messageRef = useRef(null);
  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (roomID) {
      db.collection("chats")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setListOfMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [roomID]);
  useEffect(() => {
    if (messageRef.current) {
      scrollToBottom();
    }
  }, [listOfMessages]);

  return roomID ? (
    <div className="chat">
      {/* Chat Header */}
      <div className="chat__header">
        <div className="chat__header-info">
          <Avatar />
          <h4>{roomName}</h4>
        </div>
        <div className="chat__header-extensions">
          <IconButton>
            <PhoneIcon className="icon" color="primary" />
          </IconButton>
          <IconButton>
            <VideoCallIcon className="icon" color="primary" />
          </IconButton>
          <IconButton>
            <InfoIcon className="icon" color="primary" />
          </IconButton>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat__body">
        <FlipMove>
          {listOfMessages.map(({ id, data }) => (
            <BubbleMessage key={id} data={data} />
          ))}
        </FlipMove>
        <div ref={messageRef} />
      </div>
      {/* Chat Input */}
      <div className="chat__input">
        <form>
          <input
            value={message}
            onChange={onChangeMessage}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
          />
          <SendIcon
            onClick={sendMessage}
            className="sendIcon"
            color="primary"
          />
        </form>
      </div>
    </div>
  ) : null;
}

export default Chat;
