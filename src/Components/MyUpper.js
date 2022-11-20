import { useNavigate } from "react-router-dom";

const MyUpper = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="MyUpper">
      <button
        className="backButton"
        onClick={() => navigate(-1)}
        style={{ padding: "5px" }}
      >
        <img
          src="../img/arrow.png"
          alt="arrow"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </button>
      <span className="pageDescript" style={{ fontSize: "25px" }}>
        {text}
      </span>
    </div>
  );
};

export default MyUpper;
