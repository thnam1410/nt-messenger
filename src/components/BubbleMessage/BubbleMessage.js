import { Avatar } from "@material-ui/core";
import React from "react";
import "./BubbleMessage.css";
function BubbleMessage() {
  return (
    <div className="bubbleMessage">
      <Avatar className="avatar" />
      <p>Message here</p>
      <small>timestamp</small>
    </div>
  );
}

export default BubbleMessage;
