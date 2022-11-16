import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../Components/LoginGoogle";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="Signup">
      <h2>
        일상을 굴리는 톱니바퀴, <br /> <h className="godtiner">GODTINER</h>와
        함께해요
      </h2>

      <img className="mainImg" src="img/Signup_image1.png" alt="Signup_img" />

      <div className="button1">
        {/* <googleLogin className="w-btn w-btn-brown" type="button">
          구글로 시작 및 로그인
        </googleLogin> */}
        <LoginGoogle />
      </div>

      <p className="button2">
        <button className="w-btn w-btn-indigo" type="button">
          이메일로 계정 만들기
        </button>
      </p>

      <p className="button3">
        <h1>이미 계정이 있으신가요?</h1>
        <button
          className="w-btn w-btn-blue"
          type="button"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </p>
    </div>
  );
};

export default Signup;
