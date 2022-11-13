import React, { useCallback, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const clientId =
  "1031066264934 - g58khhhkkf5hbqtbh5e4l3n2ovbrir0r.apps.googleusercontent.com";

const GoogleButton = ({ onSocial }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <div>
      <GoogleLogin>
        clientId ={clientId}
        buttonText="Google계정으로 로그인" onSuccess={onSuccess}
        onFailure={onFailure}
      </GoogleLogin>
    </div>
  );
};

export default GoogleButton;
