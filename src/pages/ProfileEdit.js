import React, { useEffect, useState } from "react";
import axios from "axios";
import MyUpper from "../Components/MyUpper";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

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
    <div className="ProfileEdit">
      <MyUpper />
      <div className="profile--edit--body">
        <div className="Edit_div_pe">
          <p>닉네임</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
        </div>

        <div className="Edit_div_pe">
          <p>자기소개</p>
          <input
            value={profileContent}
            onChange={(e) => setProfileContent(e.target.value)}
          ></input>
        </div>
      </div>
      <button className="saveBtn_pe" onClick={onSubmit}>
        저장하기
      </button>
    </div>
  );
};

export default ProfileEdit;
