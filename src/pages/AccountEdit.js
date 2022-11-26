import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MyUpper from "../Components/MyUpper";
import "./AccountEdit.css";

import UserDummyData from "../DummyData/UserDummyData.json";
const AccountEdit = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();

  const UserData = UserDummyData.User;

  //페이징 처리할 때 유저의 id 추가해야 하나?
  useEffect(() => {
    axios
      .get(`/member/${id}`)
      .then((Response) => {
        console.log(Response);
        setNickname(Response.data.nickname);
        setEmail(Response.data.email);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div>
      <MyUpper text={"계정 정보"} />
      <div className="acoountEdit_ae">
        <div className="div_ae">
          <text className="text_ae">가입일</text>
          <div className="data_ae">{UserData.UserSignupDate}</div>
        </div>
        <div className="div_ae">
          <text className="text_ae">가입 이메일</text>
          <div className="data_ae">{UserData.UserEmail}</div>
        </div>
        <button className="accountDeleteButton_ae">회원탈퇴</button>
      </div>
    </div>
  );
};

export default AccountEdit;
