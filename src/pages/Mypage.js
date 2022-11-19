import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";

import MoveTab from "../Components/MoveTab";

const Mypage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MoveTab />
    </div>
  );
};
export default Mypage;
