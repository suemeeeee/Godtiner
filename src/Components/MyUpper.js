import { useNavigate } from "react-router-dom";

const MyUpper = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="MyUpper">
      <button className="backButton" onClick={() => navigate(-1)}>
        {"←"}
      </button>
      <span className="pageDescript">{text}</span>
    </div>
  );
};

export default MyUpper;
