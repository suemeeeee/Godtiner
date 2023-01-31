import React, { useState } from "react";
import axios from "axios";

import MyUpper from "../Components/MyUpper";
import MoveTab from "../Components/MoveTab";
import { useNavigate } from "react-router-dom";

import UserDummyData from "../DummyData/UserDummyData.json";
import "./ProfileEdit.css";
import { Password } from "@mui/icons-material";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  //가입 시에 받은 nickname 넣도록! 일단 암거나
  const [profileContent, setProfileContent] = useState("");

  const onChangenickName = (e) => {
    setNickName(e.target.value);
  };

  const onChangeProfileContent = (e) => {
    setProfileContent(e.target.value);
  };

  //백이랑 통신 API 짜기 (axios)
  //일단 더미 데이터로 보내는 거
  const onSubmit = (e) => {
    UserDummyData.User.UserName = nickName;
    UserDummyData.User.UserProfileContent = profileContent;
    navigate("/mypage", { replace: true });

    //백과 api 연동 코드
    // axios
    //   .put("/member", {
    //     nickname: nickName,
    //     profilecontent: profileContent,
    //   })
    //   .then((Response) => {
    //     console.log(Response.data);
    //   })
    //   .catch((Error) => {
    //     console.log(Error);
    //   });
  };

  return (
    <div>
      <MyUpper />
      <div className="ProfileEdit">
        <div className="Edit_div_pe">
          <p>닉네임</p>
          <input
            className="nicknameInput_pe"
            onChange={onChangenickName}
          ></input>
        </div>

        <div className="Edit_div_pe">
          <p>자기소개</p>
          <input
            className="profileCommentInput_pe"
            onChange={onChangeProfileContent}
          ></input>
        </div>

        <button className="saveBtn_pe" onClick={onSubmit}>
          저장하기
        </button>
      </div>
      {/* <MoveTab /> */}
    </div>
  );
};

export default ProfileEdit;
