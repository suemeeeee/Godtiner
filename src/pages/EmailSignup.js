import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyUpper from "../Components/MyUpper";
import Popup from "../Components/Popup";

import Axios from "axios";

const EmailSignup = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const onChangeUserName = (e) => {
    setUserNameError(false);
    setUserName(e.target.value);
  };
  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    if (!validation()) {
      setPopup({
        open: true,
        title: "Error",
        message: "Please make sure all fields are filled in correctly.",
      });
      return;
    }
  };

  const validation = () => {
    if (!password) setPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

    if (password && userName && email) return true;
    else return false;
  };

  Axios.post("http://localhost:8080/join", {
    password: password,
    userName: userName,
    email: email,
  })
    .then(function (response) {
      if (response.data.code == 0) {
        setPopup({
          open: true,
          title: "Confirm",
          message: "Join Success!",
          callback: function () {
            navigate("/Login"); //회원가입 허가 후 바로 로그인 창으로 이동
          },
        });
      } else {
        let message = response.data.message;
        if (response.data.code == 10000) {
          message = "User ID is duplicated. Please enter a different User ID. ";
        }
        setPopup({
          open: true,
          title: "Error",
          message: message,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <MyUpper />
      <div className="welcome">
        <h2>
          Godtiner님, <br /> 가입을 환영해요!
        </h2>
      </div>

      <div className="userNameDiv">
        <input
          placeholder="닉네임"
          className="userName"
          value={userName}
          onChange={onChangeUserName}
        />
        {userNameError && <div class="invalid-input">Required.</div>}
      </div>

      <div className="idDiv">
        <input
          placeholder="이메일"
          className="loginId"
          value={email}
          onChange={onChangeEmail}
        />
        {emailError && (
          <div class="invalid-input">Please enter valid email format.</div>
        )}
      </div>
      <div className="pwDiv">
        <input
          type="password"
          placeholder="비밀번호"
          className="loginPw"
          value={password}
          onChange={onChangePassword}
        />
        {passwordError && (
          <div class="invalid-input">
            Password must be at least 8 characters and contain at least one
            letter and one number.{" "}
          </div>
        )}
      </div>
      <div className="buttonDiv">
        <button type="button" className="loginButton" onClick={onSubmit}>
          회원가입
        </button>
      </div>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      />
    </div>
  );
};

export default EmailSignup;
