// 로그인 버튼 클릭 시
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    axios
      .post("/signIn", {
        password: password,
        email: email,
      })
      .then((response) => {
        console.log(response);
        //백엔드랑 연동 시험
        localStorage.clear();
        localStorage.setItem("token", response.data);
        //여기까지가 시험
        window.location.href = "http://localhost:3000/home";
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const navigate = useNavigate();

  return (
    <div>
      <MyUpper />
      <div className="Login">
        <h2 className="welcome">
          오늘도 힘차게 <br /> 달려봐요!
        </h2>

        <input
          placeholder="이메일"
          value={email}
          className="loginId"
          onChange={onChangeEmail}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          className="loginPw"
          onChange={onChangePassword}
        />

        <button type="button" className="loginButton" onClick={onSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
