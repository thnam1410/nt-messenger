import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import Messenger from "./components/Messenger/Messenger";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase/firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userinfo = {
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          displayName: user.displayName,
        };
        dispatch(login(userinfo));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return <div className="App">{user ? <Messenger /> : <Login />}</div>;
}

export default App;
