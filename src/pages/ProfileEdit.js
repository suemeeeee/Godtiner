import React, { useEffect, useState } from "react";
import axios from "axios";

import MyUpper from "../Components/MyUpper";
import MoveTab from "../Components/MoveTab";
import { useNavigate } from "react-router-dom";

import UserDummyData from "../DummyData/UserDummyData.json";
import "./ProfileEdit.css";
import { Password } from "@mui/icons-material";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  //가입 시에 받은 nickname 넣도록! 일단 암거나
  const [profileContent, setProfileContent] = useState("");

  const onChangenickname = (e) => {
    setNickname(e.target.value);
    frm.append("nickname", nickname);
  };

  const onChangeProfileContent = (e) => {
    setProfileContent(e.target.value);
    frm.append("introduction", profileContent);
  };

  var frm = new FormData();

  useEffect(() => {
    axios
      .get("http://localhost:8080/member", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNickname(res.data.nickname);
        setProfileContent(res.data.introduction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //api 연동 코드
  const onSubmit = (e) => {
    axios
      .put(
        "http://localhost:8080/member",
        {
          nickname: nickname,
          introduction: profileContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((Response) => {
        console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });

    navigate("/mypage", { replace: true });
  };
  console.log(profileContent);
  return (
    <div>
      <MyUpper />
      <div className="ProfileEdit">
        <div className="Edit_div_pe">
          <p>닉네임</p>
          <input
            className="nicknameInput_pe"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
        </div>

        <div className="Edit_div_pe">
          <p>자기소개</p>
          <input
            className="profileCommentInput_pe"
            value={profileContent}
            onChange={(e) => setProfileContent(e.target.value)}
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
