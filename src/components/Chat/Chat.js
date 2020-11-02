import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import PhoneIcon from "@material-ui/icons/Phone";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import InfoIcon from "@material-ui/icons/Info";
import BubbleMessage from "../BubbleMessage/BubbleMessage";
import SendIcon from "@material-ui/icons/Send";

function Chat() {
  return (
    <div className="chat">
      {/* Chat Header */}
      <div className="chat__header">
        <div className="chat__header-info">
          <Avatar />
          <h4>Name</h4>
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
        <BubbleMessage />
      </div>
      {/* Chat Input */}
      <div className="chat__input">
        <form>
          <input placeholder="Type your message here..." />
        </form>
        <SendIcon className="sendIcon" color="primary" />
      </div>
    </div>
  );
}

export default Chat;
