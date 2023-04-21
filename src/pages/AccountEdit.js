import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MyUpper from "../Components/MyUpper";
import "./AccountEdit.css";

import UserDummyData from "../DummyData/UserDummyData.json";
const AccountEdit = () => {
  let { id } = useParams();
  const [email, setEmail] = useState();
  const UserData = UserDummyData.User;

  useEffect(() => {
    axios
      .get(`/member/${id}`)
      .then((Response) => {
        console.log(Response);
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
          <p className="p_text--ae">가입일</p>
          <p className="data_ae">{UserData.UserSignupDate}</p>
        </div>
        <div className="div_ae">
          <p className="p_text--ae">가입 이메일</p>
          <p className="data_ae">{UserData.UserEmail}</p>
        </div>
        <button className="accountDeleteButton_ae">회원탈퇴</button>
      </div>
    </div>
  );
};

export default AccountEdit;
