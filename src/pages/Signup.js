import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../Components/LoginGoogle";
import Axios from "axios";

function Signup() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    let res = await Axios.get("http://localhost:8080/user");
    setUser(res.data);
  };

  const navigate = useNavigate();

  return (
    <div className="Signup">
      <h1>
        일상을 굴리는 톱니바퀴, <br /> GODTINER와 함께해요
      </h1>

      <img className="mainImg" src="img/Signup_image1.png" alt="Signup_img" />

      <div className="btnAreaDiv_su">
        <button
          className="makeAccountBtn_su"
          type="button"
          onClick={() => navigate("/emailsignup")}
        >
          이메일로 계정 만들기
        </button>

        <h4>이미 계정이 있으신가요?</h4>
        <button
          className="LoginBtn_su"
          type="button"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default Signup;
