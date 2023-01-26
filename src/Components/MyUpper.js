import { useNavigate } from "react-router-dom";
import "./MyUpper.css";
const MyUpper = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="MyUpper_div">
      <button className="backButton" onClick={() => navigate(-1)}>
        <img className="MyUpper_img" src="../img/arrow.png" alt="arrow" />
      </button>
      <p className="pageDescript">{text}</p>
    </div>
  );
};

export default MyUpper;
