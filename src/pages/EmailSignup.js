import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import MyUpper from "../Components/MyUpper";
import Popup from "../Components/Popup";
import "./EmailSignup.css";

import axios from "axios";

const EmailSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [nickNameError, setNickNameError] = useState(false);

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

  const onChangeNickName = (e) => {
    setNickNameError(false);
    setNickName(e.target.value);
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
        message: "내용을 올바르게 입력해 주세요 .",
      });
      return;
    } else {
      axios
        .post("/signUp", {
          email: email,
          password: password,
          name: userName,
          nickname: nickName,
        })
        .then(function (response) {
          if (response) {
            navigate("/likedtag", { state: { email } });
            // window.location.href = "http://localhost:3000/likedtag";
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.data.errorCode === 600) {
            alert("이미 가입된 이메일입니다.");
          }
        });
    }
  };

  const validation = () => {
    if (!password) setPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!nickName) setNickNameError(true);
    if (!email) setEmailError(true);

    if (password && userName && email && nickName) return true;
    else return false;
  };

  return (
    <div className="EmailSignup">
      <MyUpper />
      <h2>
        Godtiner님, <br /> 가입을 환영해요!
      </h2>

      <div className="infoInput_es">
        <input
          placeholder="유저명"
          className="userName_es"
          value={userName}
          onChange={onChangeUserName}
        />
        {/* {userNameError && (
        <div className="invalid-input">유저명을 입력해주세요</div>
      )} */}

        <input
          placeholder="닉네임"
          className="nickName_es"
          value={nickName}
          onChange={onChangeNickName}
        />
        {/* {nickNameError && (
        <div className="invalid-input">닉네임을 입력해주세요</div>
      )} */}

        <input
          placeholder="이메일"
          className="loginId_es"
          value={email}
          onChange={onChangeEmail}
        />
        {/* {emailError && (
          <div className="invalid-input">유효한 이메일을 입력해주세요</div>
        )} */}

        <input
          type="password"
          placeholder="비밀번호"
          className="loginPw_es"
          value={password}
          onChange={onChangePassword}
        />
        {/* {passwordError && (
          <div className="invalid-input">
            비밀번호는 1개 이상의 숫자와 문자를 포함하여 8자 이상이어야 합니다.
          </div>
        )} */}
      </div>
      <button type="button" className="loginButton_es" onClick={onSubmit}>
        회원가입
      </button>

      {/* <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      /> */}
    </div>
  );
};

export default EmailSignup;
