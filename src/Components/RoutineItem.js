import "./RoutineItem.css";
import { useNavigate } from "react-router-dom";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

const RoutineItem = ({ id, content, startTime, endTime, isclear }) => {
  // home화면에서 세부 루틴들을 보여줌

  const navigate = useNavigate();

  //체크박스 누르면 루틴 클리어 되면서 지워지는 함수
  const routineClear = (e) => {
    isclear = !isclear;
    console.log(isclear);
    if (isclear === true) {
      document.getElementById("gg").className = "clearedRoutine";
    } else {
      document.getElementById("gg").className = "MyRoutineContent";
    }
  };

  const setClassNameClear = () => {
    navigate(`/myroutineeditor/${id}`);
  };
  return (
    <div className="routineGroup">
      <div className="time">
        {startTime}-{endTime}
      </div>
      <button
        id="gg"
        className={"MyRoutineContent"}
        onClick={setClassNameClear}
      >
        {content}
      </button>
      <input value={id} type="checkbox" onClick={routineClear} />
    </div>
  );
};
export default RoutineItem;
