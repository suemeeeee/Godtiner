//상세루틴 편집하는 컴포넌트

import { useEffect, useRef, useState } from "react";
//import mui
import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

import "./RoutineEditor.css";

const RoutineEditor = ({ isEdit, originData }) => {
  let r_id = 0;
  if (parseInt(MyRoutineDummyData.MyRoutine.length) > 0) {
    r_id =
      parseInt(
        MyRoutineDummyData.MyRoutine[MyRoutineDummyData.MyRoutine.length - 1].id
      ) + 1;
  } else {
    r_id = 1;
  }
  // const r_id =
  //   parseInt(
  //     MyRoutineDummyData.MyRoutine[MyRoutineDummyData.MyRoutine.length - 1].id
  //   ) + 1;

  //세부루틴 이름
  const [content, setContent] = useState("");
  //알림설정
  const [onOff, setOnOff] = useState(false);
  //시작시간
  const [startTime, setStartTime] = useState("");
  //끝나는 시간
  const [endTime, setEndTime] = useState("");

  const contentRef = useRef();
  const navigate = useNavigate();

  //삭제를 위해서
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      setStartTime(originData.startTime);
      setEndTime(originData.endTime);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const handleSubmit = () => {
    let newRoutine = [];

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (!isEdit) {
      let newData = {
        id: r_id,
        startTime,
        endTime,
        content,
      };
      newRoutine = [...MyRoutineDummyData.MyRoutine, newData];
      MyRoutineDummyData.MyRoutine = newRoutine;
    } else {
      let new_data = {
        id: originData.id,
        startTime,
        endTime,
        content,
      };
      const getIndex = MyRoutineDummyData.MyRoutine.indexOf(originData);
      MyRoutineDummyData.MyRoutine[getIndex] = new_data;
    }
    navigate("/home", { replace: true });
  };

  const onRemove = () => {
    if (window.confirm("루틴을 삭제하시겠습니까?")) {
      const filterRoutine = MyRoutineDummyData.MyRoutine.filter(
        (it) => parseInt(it.id) !== parseInt(id)
      );
      MyRoutineDummyData.MyRoutine = filterRoutine;
      alert("삭제완료");
      navigate("/home", { replace: true });
    } else {
      alert("취소되었습니다");
    }
  };

  return (
    <div className="RoutineEditor">
      <section className="routineSection">
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
            className="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            className="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <span>요일 반복</span>
        </div>
        <div className="removeText" onClick={onRemove}>
          {isEdit ? "삭제하기" : " "}
        </div>
      </section>
      <button className="submitRoutine_btn" onClick={handleSubmit}>
        {isEdit ? "수정하기" : "추가하기"}
      </button>
    </div>
  );
};
export default RoutineEditor;
