import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import "./SideBarChat.css";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch } from "react-redux";
import { setRoom } from "../../features/chatSlice";

function SideBarChat({ id, chatName, chatRoomPass }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const dispatch = useDispatch();

  const handleOpenPassDialog = () => {
    setOpenDialog(true);
  };
  const handleClosePassDialog = () => {
    setOpenDialog(false);
  };
  const onSubmitPass = () => {
    if (inputPass === chatRoomPass) {
      const roomInfo = { roomId: id, roomName: chatName };
      dispatch(setRoom(roomInfo));
      setOpenDialog(false);
      setInputPass("");
    } else {
      alert("Wrong Password");
      setOpenDialog(false);
      setInputPass("");
    }
  };
  const handleOnClickRoom = () => {
    const roomInfo = { roomId: id, roomName: chatName };
    if (chatRoomPass !== "") {
      handleOpenPassDialog();
    } else {
      dispatch(setRoom(roomInfo));
    }
  };
  console.log(openDialog);
  return (
    <div>
      <div onClick={handleOnClickRoom} className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h4>{chatName}</h4>
          <p>Chat</p>
          <small>timestamp</small>
          {chatRoomPass !== "" ? (
            <LockIcon className="lock-icon" style={{ fontSize: 15 }} />
          ) : null}
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleClosePassDialog}>
        <DialogContent>
          <TextField
            value={inputPass}
            onChange={(event) => {
              setInputPass(event.target.value);
            }}
            margin="dense"
            autoFocus
            label="Password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitPass} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SideBarChat;
