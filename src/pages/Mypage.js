import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import Avatar from "react-avatar-edit";
import "./Mypage.css";

import MoveTab from "../Components/MoveTab";
import { width } from "@mui/system";

const Mypage = () => {
  const navigate = useNavigate();

  const [nickName, setNickName] = useState("새싹티너");
  const [email, setEmail] = useState("godtiner@gmail.com");
  const [content, setContent] = useState("안녕하세욧. 갓티너 초짜입니당.");
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
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
    <div className="myPageCss">
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
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <div className="userName_mp">{nickName}</div>
      <div className="userEmail_mp">{email}</div>
      <div className="content_mp">{content}</div>
      <button className="profileEdit">프로필 편집</button>
      <div className="alertEdit">알림 설정</div>
      <div className="editButton">
        <button className="editButton1">계정 설정</button>

        <button className="editButton1">찜한 루틴 편집</button>

        <button className="editButton1">공유한 루틴 편집</button>
      </div>
      <div>
        <button className="logoutButton">로그아웃</button>
      </div>
      <MoveTab />
    </div>
  );
};
export default Mypage;
