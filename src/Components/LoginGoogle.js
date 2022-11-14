import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginGoogle = () => {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="1031066264934-g58khhhkkf5hbqtbh5e4l3n2ovbrir0r.apps.googleusercontent.com">
        <GoogleLogin>
          buttonText = "google login" onSuccess ={" "}
          {(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError=
          {() => {
            console.log("login Failed");
          }}
        </GoogleLogin>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
};

export default LoginGoogle;
