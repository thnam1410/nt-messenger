import React from "react";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import './Messenger.css'

function Messenger() {
  return (
    <div className="Messenger">
      <SideBar />
      <Chat />
    </div>
  );
}

export default Messenger;
