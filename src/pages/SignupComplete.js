import { useNavigate } from "react-router-dom";
import "./SignupComplete.css";
const SignupComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="SignupComplete">
      <h1>
        Godtiner가 되신 것을 <br /> 축하드려요!
      </h1>

      <button className="loginButton_sc" onClick={() => navigate("/login")}>
        로그인하러 가기
      </button>
    </div>
  );
};

export default SignupComplete;
