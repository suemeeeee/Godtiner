import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import "./AccountEdit.css";

import UserDummyData from "../DummyData/UserDummyData.json";
const AccountEdit = () => {
  const navigate = useNavigate();

  const UserData = UserDummyData.User;

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
