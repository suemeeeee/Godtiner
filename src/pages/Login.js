// 로그인 버튼 클릭 시
import { useState, useNavigate } from "react";
import MyUpper from "../Components/MyUpper";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [button, setButton] = useState(true);

  const realId = "kiki@naver.com"; //아직 서버 없으니까 임시 데이터
  const realPw = "12345678";

  function changeButton() {
    id.includes("@") && pw.length >= 5 ? setButton(false) : setButton(true);
  }

  const goToMain = () => {
    navigate("/home");
  };

  const navigate = useNavigate();

  return (
    <div>
      <h2>ㅠㅠ</h2>
      <MyUpper />
      <h2>
        다시 돌아온 것을 <br /> 환영해요!
      </h2>
      <p>이메일</p>
      <input
        placeholder="E-mail"
        id="id"
        className="login"
        onChange={(e) => {
          setId(e.target.value);
        }}
        onKeyUp={changeButton}
      />
      <input
        type="password"
        placeholder="비밀번호"
        id="password"
        className="login"
        onChange={(e) => {
          setPw(e.target.value);
        }}
        onKeyUp={changeButton}
      />
      <button
        type="button"
        className="loginButton"
        disabled={button}
        onClick={(e) => {
          if (realId === id) {
            if (realPw === pw) {
              e.stopPropagation();
              goToMain();
            }
          } else {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
          }
        }}
      />
    </div>
  );
};
export default Login;
