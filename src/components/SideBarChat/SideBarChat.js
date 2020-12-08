import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SideBarChat.css";
import CloseIcon from "@material-ui/icons/Close";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../../features/chatSlice";
import { selectRoomId, selectRoomName } from "../../features/chatSlice";
import db from "../../firebase/firebase";
import * as timeago from "timeago.js";

function SideBarChat({ id, chatName, chatRoomPass, user }) {
  const [chatRoomInfo, setChatRoomInfo] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const [mouseIn, setMouseIn] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const dispatch = useDispatch();
  const getRoom = useSelector(selectRoomId);

  const lastMessage = () => {
    if (chatRoomPass !== "") {
      return "*********";
    }
    if (chatRoomInfo[0]?.message) {
      const lastMess = chatRoomInfo[0].message;
      if (lastMess.length > 15) {
        return lastMess.slice(0, 15) + "...";
      }
      return lastMess;
    }
  };

  const handleOpenPassDialog = () => {
    setOpenDialog(true);
  };
  const handleClosePassDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenPassDialogDelete = () => {
    setOpenDialogDelete(true);
  };
  const handleClosePassDialogDelete = () => {
    setOpenDialogDelete(false);
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
  const checkAdminAccount = user.email === "thnam1410@gmail.com" ? true : false;

  const onMouseEnterRoom = () => {
    if (checkAdminAccount) {
      setMouseIn(true);
    }
  };

  const onMouseLeaveRoom = () => {
    if (checkAdminAccount) {
      setMouseIn(false);
    }
  };

  const onClickDeleteRoom = (event) => {
    event.stopPropagation();
    setOpenDialogDelete(true);
  };
  const onSubmitDelete = () => {
    db.collection("chats")
      .doc(id)
      .delete()
      .then(alert("Remove Successfully"))
      .catch("Something is wrong, can not delete");
    if (id === getRoom) {
      dispatch(setRoom({ roomId: null, roomName: null }));
    }
  };

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatRoomInfo(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);

  return (
    <div>
      <div
        onMouseOver={onMouseEnterRoom}
        onMouseLeave={onMouseLeaveRoom}
        onClick={handleOnClickRoom}
        className="sidebarChat">
        <Avatar src={chatRoomInfo[0]?.photo} />
        <div className="sidebarChat__info">
          <h4>{chatName}</h4>
          <p>{lastMessage()}</p>
          <small>
            {mouseIn ? (
              <CloseIcon onClick={onClickDeleteRoom} />
            ) : chatRoomInfo[0]?.timestamp ? (
              timeago.format(new Date(chatRoomInfo[0]?.timestamp.toDate()))
            ) : (
              ""
            )}
          </small>
          {chatRoomPass !== "" ? (
            <LockIcon className="lock-icon" style={{ fontSize: 15 }} />
          ) : null}
        </div>
      </div>

      <Dialog open={openDialogDelete} onClose={handleClosePassDialogDelete}>
        <DialogTitle color="primary">
          Do you want to delete this room?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onSubmitDelete} color="primary">
            Yes
          </Button>
          <Button onClick={() => setOpenDialogDelete(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>

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
