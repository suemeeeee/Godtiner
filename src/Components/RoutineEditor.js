//상세루틴 편집하는 컴포넌트

import { useEffect, useRef, useState } from "react";
//import mui
import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

import "./RoutineEditor.css";

const RoutineEditor = ({ isEdit, originData }) => {
  //루틴 아이디 설정하는 로직에 뭔가 문제 있는 거 같음 ... 추가할 땐 ㄱㅊ한데 이미 있는 1, 2 들도 계속 3이야
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

  //월~일 요일 버튼 클릭 시 MyRoutineDummyData에 각각 요일 값 boolean 처리 함수
  const onClickRoutineRule = (e) => {
    MyRoutineDummyData.MyRoutine[r_id - 2].routineRules[
      parseInt(e.target.value)
    ] =
      !MyRoutineDummyData.MyRoutine[r_id - 2].routineRules[
        parseInt(e.target.value)
      ];

    if (
      MyRoutineDummyData.MyRoutine[r_id - 2].routineRules[
        parseInt(e.target.value)
      ]
    ) {
      document.getElementById(e.target.id).style.backgroundColor = "blue";
    } else {
      document.getElementById(e.target.id).style.backgroundColor =
        "rgb(228, 228, 228)";
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
          <span className="textSpan_re">알림 설정</span>
          <Switch
            checked={onOff}
            onChange={(e) => {
              setOnOff(e.target.checked);
            }}
          />
        </div>

        <div className="timeDay">
          <span className="textSpan_re">시간 설정 </span>
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
        <div className="routineRules_div">
          <span className="textSpan_re">요일 반복</span>
          <br />
          <div className="routineRulesBtn_div">
            <button
              id="monBtn"
              value="0"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              월
            </button>
            <button
              id="tueBtn"
              value="1"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              화
            </button>
            <button
              id="wedBtn"
              value="2"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              수
            </button>
            <button
              id="thuBtn"
              value="3"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              목
            </button>
            <button
              id="friBtn"
              value="4"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              금
            </button>
            <button
              id="satBtn"
              value="5"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              토
            </button>
            <button
              id="sunBtn"
              value="6"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              일
            </button>
          </div>
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
