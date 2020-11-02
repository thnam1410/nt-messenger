import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SearchIcon from "@material-ui/icons/Search";
import SideBarChat from "../SideBarChat/SideBarChat";
import db, { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SideBar() {
  const [chatRoomNames, setChatRoomNames] = useState([]);
  const user = useSelector(selectUser);

  const logout = () => {
    auth.signOut();
  };

  const addChat = () => {
    const chatRoom = prompt("Please enter your chat room name");
    const chatRoomPassword = prompt("Password:");
    if (chatRoomNames.includes(chatRoom)) {
      alert("Chat Room already existed");
    } else {
      db.collection("chats")
        .add({
          chatRoom: chatRoom,
          chatRoomPassword: chatRoomPassword,
        })
        .then(() => {
          alert("Create Room Successful");
        });
    }
  };

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => setChatRoomNames(doc.data().chatRoom));
    });
  }, []);

  return (
    <div className="sidebar">
      {/* SideBar Header */}
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          onClick={logout}
          className="sidebar__header-avatar"
        />
        <h2>Chat</h2>

        <IconButton>
          <AddBoxIcon
            onClick={addChat}
            className="icon"
            style={{ fontSize: 30 }}
            color="primary"
          />
        </IconButton>
      </div>

      {/* SideBar Search */}
      <div className="sidebar__search">
        <SearchIcon />
        <input placeholder="Search" />
      </div>

      {/* SideBar Chat */}
      <div className="sidebar__chats">
        <SideBarChat />
        <SideBarChat />
      </div>
    </div>
  );
}

export default SideBar;
