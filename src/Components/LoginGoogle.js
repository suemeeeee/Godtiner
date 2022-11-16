import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

// import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "1031066264934-g58khhhkkf5hbqtbh5e4l3n2ovbrir0r.apps.googleusercontent.com";
const LoginGoogle = ({ onSocial }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    console.log(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Google로 로그인"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default LoginGoogle;
