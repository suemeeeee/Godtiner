import "./RoutineItem.css";
import { useNavigate } from "react-router-dom";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import UserDummyData from "../DummyData/UserDummyData.json";

const RoutineItem = ({ id, content, startTime, endTime, isclear }) => {
  // home화면에서 세부 루틴들을 보여줌

  const navigate = useNavigate();

  //체크박스 누르면 루틴 클리어 되면서 지워지는 함수
  const routineClear = (e) => {
    isclear = !isclear;
    console.log("클리어 상태", isclear);
    console.log("해당 체크박스 아이디", id);
    //아래는 클리어하면 className 바꿔서 css 변경 함수
    //근데 다 첫번째 content에만 적용됨... 내일 디버깅하자 ㅜ
    //태그의 id를 넘겨받은 변수 id로 지정할 수 있으면 좋은데.. 태그 id는 변수로 지정이 안됨 ㅜㅜ
    if (isclear === true) {
      document.getElementById("routine").className = "clearedRoutine";
    } else {
      document.getElementById("routine").className = "MyRoutineContent";
    }
    //아래는 클리어 시 클리어한 루틴 갯수 카운트
    if (isclear === true) {
      UserDummyData.User.ClearedRoutine += 1;
    } else {
      UserDummyData.User.ClearedRoutine -= 1;
    }
    console.log("클리어한 총루틴 갯수", UserDummyData.User.ClearedRoutine);
  };

  const onClickContent = () => {
    navigate(`/myroutineeditor/${id}`);
    console.log("콘텐트 id", id);
  };
  return (
    <div className="routineGroup">
      <div className="time">
        {startTime}-{endTime}
      </div>
      <button
        id="routine"
        className={"MyRoutineContent"}
        onClick={onClickContent}
      >
        {content}
      </button>
      <input value={id} type="checkbox" onClick={routineClear} />
    </div>
  );
};
export default RoutineItem;
