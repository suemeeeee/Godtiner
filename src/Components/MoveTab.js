import { useNavigate } from "react-router-dom";

const MoveTab = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div>
        <button className="Home_btn" onClick={() => navigate("/")}>
          🗓️
        </button>
      </div>
      <div>
        <button
          className="Recommend_btn"
          onClick={() => navigate("/recommend")}
        >
          👍
        </button>
      </div>
      <div>
        <button className="Feed_btn" onClick={() => navigate("/feed")}>
          🔍
        </button>
      </div>
      <div>
        <button className="Mission_btn" onClick={() => navigate("/Mission")}>
          🏆
        </button>
      </div>
      <div>
        <button
          className="Mypage_btn"
          onClick={() => navigate("/mypage")}
        ></button>
      </div>
    </footer>
  );
};

export default MoveTab;
