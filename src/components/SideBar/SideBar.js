import {
  Avatar,
  IconButton,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
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
  const [chats, setChats] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [roomNameDialog, setroomNameDialog] = useState("");
  const [roomPassDialog, setroomPassDialog] = useState("");
  const user = useSelector(selectUser);

  const logout = () => {
    auth.signOut();
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const clearDialog = () => {
    setroomNameDialog("");
    setroomPassDialog("");
  };
  const handleCloseDialog = () => {
    clearDialog();
    setOpenDialog(false);
  };
  const handleOnChangeRoomName = (event) => {
    setroomNameDialog(event.target.value);
  };
  const handleOnChangeRoomPass = (event) => {
    setroomPassDialog(event.target.value);
  };

  const addChat = () => {
    if (roomNameDialog) {
      console.log(chatRoomNames);
      if (chatRoomNames != null && chatRoomNames.includes(roomNameDialog)) {
        alert("Chat Room already existed");
        setOpenDialog(false);
        clearDialog();
      } else {
        db.collection("chats")
          .add({
            chatRoom: roomNameDialog,
            chatRoomPassword: roomPassDialog,
          })
          .then(() => {
            clearDialog();
            setOpenDialog(false);
          });
      }
    }
  };

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setChatRoomNames(snapshot.docs.map((doc) => doc.data().chatRoom));
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

        <IconButton onClick={handleOpenDialog}>
          <AddBoxIcon
            className="icon"
            style={{ fontSize: 30 }}
            color="primary"></AddBoxIcon>
        </IconButton>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Room Information:</DialogTitle>
          <DialogContent>
            <TextField
              value={roomNameDialog}
              onChange={handleOnChangeRoomName}
              margin="dense"
              autoFocus
              fullWidth
              label="Room Name"
            />
            <TextField
              value={roomPassDialog}
              onChange={handleOnChangeRoomPass}
              argin="dense"
              fullWidth
              label="Pass word"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addChat} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* SideBar Search */}
      <div className="sidebar__search">
        <SearchIcon />
        <input placeholder="Search" />
      </div>

      {/* SideBar Chat */}
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatRoom, chatRoomPassword } }) => (
          <SideBarChat
            key={id}
            id={id}
            chatName={chatRoom}
            chatRoomPass={chatRoomPassword}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
