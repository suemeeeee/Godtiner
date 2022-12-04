// 추천페이지

import MySearchAlarm from "../Components/MySearchAlarm";
import MoveTab from "../Components/MoveTab";
import "./Recommend.css";

import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const navigate = useNavigate();
  const onClickViewAll = () => {
    navigate("/viewall");
  };
  return (
    <div>
      <MySearchAlarm />
      <diiv>
        <div>
          <span className="span_rm">✨인기루틴</span>
          <span className="span_rm_text" onClick={onClickViewAll}>
            view All
          </span>
        </div>
      </diiv>
      <MoveTab />
    </div>
  );
};

export default Recommend;
