import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import "./Login.css";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MyUpper />
    </div>
  );
};
export default Mypage;
