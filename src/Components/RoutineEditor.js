//상세루틴 편집하는 컴포넌트

import { useContext, useRef, useState } from "react";
//import mui
import Switch from "@mui/material/Switch";
import { RoutineDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

import "./RoutineEditor.css";

const RoutineEditor = () => {
  const contentRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(content, startTime, endTime);
    navigate("/");
  };

  const { onCreate, onEdit, onRemove } = useContext(RoutineDispatchContext);
  //세부루틴 이름
  const [content, setContent] = useState("");

  //알림설정
  const [onOff, setOnOff] = useState(false);
  //시작시간
  const [startTime, setStartTime] = useState("");
  //끝나는 시간
  const [endTime, setEndTime] = useState("");

  return (
    <div className="RoutineEditor">
      <section>
        <div className="RoutinName">
          <input
            className="NameBox"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="Notification">
          <span>알림 설정</span>
          <Switch
            checked={onOff}
            onChange={(e) => {
              setOnOff(e.target.checked);
            }}
          />
        </div>

        <div className="timeDay">
          <span>시간 설정 </span>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <span>요일 반복</span>
        </div>
      </section>
      <button onClick={handleSubmit}>추가하기</button>
    </div>
  );
};
export default RoutineEditor;
