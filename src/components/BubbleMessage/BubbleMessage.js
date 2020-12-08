import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./BubbleMessage.css";
import * as timeago from "timeago.js";

const BubbleMessage = forwardRef(
  (
    { id, data: { timestamp, displayName, photo, message, email, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    console.log(timestamp, displayName, photo, message, email, uid);
    return (
      <div
        ref={ref}
        className={`bubbleMessage ${user.email === email && "main"}`}>
        <Avatar src={photo} className="avatar" />
        <p>{message}</p>
        <small className="timestamp">
          {timeago.format(new Date(timestamp?.toDate()))}
        </small>
        <small className="userName">{email}</small>
      </div>
    );
  }
);

export default BubbleMessage;
