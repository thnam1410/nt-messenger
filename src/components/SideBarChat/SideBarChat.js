import { Avatar } from "@material-ui/core";
import React from "react";
import "./SideBarChat.css";
function SideBarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h4>Name</h4>
        <p>Chat</p>
        <small>timestamp</small>
      </div>
    </div>
  );
}

export default SideBarChat;
