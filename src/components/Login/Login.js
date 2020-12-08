import { Button } from "@material-ui/core";
import React from "react";
import { auth, googleProvider } from "../../firebase/firebase";
import "./Login.css";

function Login() {
  const signInGoogle = () => {
    auth.signInWithPopup(googleProvider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src={
            "https://i.pinimg.com/originals/47/74/fd/4774fd9d0de2aa43fe15e6b24876978c.png"
          }
          alt=""
        />
        <h1>Nam Truong Messenger</h1>
      </div>
      <Button onClick={signInGoogle}>Sign In With Google</Button>
    </div>
  );
}

export default Login;
