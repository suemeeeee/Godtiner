import "./RoutineItem.css";
import { useNavigate } from "react-router-dom";

import RoutineEditor from "./RoutineEditor";

const RoutineItem = ({ id, content, startTime, endTime }) => {
  // home화면에서 세부 루틴들을 보여줌

  const navigate = useNavigate();
  return (
    <div className="routineGroup">
      <div className="time">
        {startTime}-{endTime}
      </div>
      <button
        className="RoutineContent"
        onClick={() => navigate("/routineeditor")}
        //왜 이동 안해~!~!!
      >
        {content}
      </button>
    </div>
  );
};
export default RoutineItem;
