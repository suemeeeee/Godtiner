import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import Avatar from "react-avatar-edit";
import "./Mypage.css";

import MoveTab from "../Components/MoveTab";

import UserDummyData from "../DummyData/UserDummyData.json";

const Mypage = () => {
  const navigate = useNavigate();

  const [Image, setImage] = useState(UserDummyData.User.UserProfileImg);
  const fileInput = useRef(null);

  const onChangeImg = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(UserDummyData.User.UserProfileImg);
      return;
    }

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="Mypage">
      <img
        className="profileImg"
        src={Image}
        size={100}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profileImg"
        onChange={onChangeImg}
        ref={fileInput}
      />
      <div className="userInfoDiv_mp">
        <p className="userName_mp">{UserDummyData.User.UserName}</p>
        <p className="userEmail_mp">{UserDummyData.User.UserEmail}</p>
        <p className="content_mp">{UserDummyData.User.UserProfileContent}</p>
      </div>
      <button
        className="profileEditBtn"
        onClick={() => {
          navigate("/profileedit");
        }}
      >
        프로필 편집
      </button>
      {/* <div className="alertEdit">알림 설정</div> */}
      <div className="editButtonsDiv">
        <button
          className="editBtn"
          onClick={() => {
            navigate("/accountedit");
          }}
        >
          계정 설정
        </button>

        <button
          className="editBtn"
          onClick={() => {
            navigate("/likedroutineedit");
          }}
        >
          찜한 루틴 편집
        </button>

        <button className="editBtn">공유한 루틴 편집</button>
        <button
          className="editBtn"
          onClick={() => {
            navigate("/changetag");
          }}
        >
          관심사 태그 변경
        </button>
      </div>

      <button className="logoutButton">로그아웃</button>

      <MoveTab />
    </div>
  );
};
export default Mypage;
