//상세루틴 편집하는 컴포넌트

import { useEffect, useRef, useState } from "react";
//import mui
import Switch from "@mui/material/Switch";
import { useNavigate, useParams } from "react-router-dom";

import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

import "./RoutineEditor.css";
import axios from "axios";

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

  // const [routineRules, setRoutineRules] = useState({
  //   mon: false,
  //   tue: false,
  //   wed: false,
  //   thu: false,
  //   fri: false,
  //   sat: false,
  //   sun: false,
  // });

  let routineRules = [
    {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
  ];

  console.log(routineRules);

  const contentRef = useRef();
  const navigate = useNavigate();

  //수정 및 삭제를 위해서
  const { id } = useParams();
  console.log(id);

  //백엔드 연동을 위한 함수
  //시작이나 끝나는 시간이 수정되었는지 판별하는 함수
  const isSameTime = (time, originTime) => {
    if (time === startTime) {
      if (startTime === originTime) {
        setStartTime("");
      }
    } else {
      if (endTime === originTime) {
        setEndTime("");
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setStartTime(originData.startTime);
      setEndTime(originData.endTime);
      setContent(originData.content);
      routineRules = originData.routineRules;
    }
  }, [isEdit, originData]);

  const handleSubmit = () => {
    let newRoutine = [];

    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (!isEdit) {
      //백엔드 연동 시험
      axios
        .post(
          "http://localhost:8080/myRoutine/save",
          {
            content: content,
            startTime: startTime,
            endTime: endTime,
            myRulesList: routineRules,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          navigate("/home", { replace: true });
        })
        .catch((error) => {
          console.log(error.response);
        });
      //여기까지가 백엔드 연동시험

      /* 더미데이터로 할 경우
      let newData = {
        id: r_id,
        startTime,
        endTime,
        content,
        routineRules,
      };
      newRoutine = [...MyRoutineDummyData.MyRoutine, newData];
      MyRoutineDummyData.MyRoutine = newRoutine;
      */
    } else {
      //백엔드로 연동 시작
      isSameTime(startTime, originData.startTime);
      isSameTime(endTime, originData.endTime);
      axios
        .put(
          `http://localhost:8080/myRoutine/detail/${id}`,
          {
            content: content,
            startTime: startTime,
            endTime: endTime,
            newRules: routineRules,
          },
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          navigate("/home", { replace: true });
        })
        .catch((error) => {
          console.log(error.response);
        });

      //연동 끝

      /* 더미데이터로 할 경우
      let new_data = {
        id: originData.id,
        startTime,
        endTime,
        content,
        routineRules,
      };
      const getIndex = MyRoutineDummyData.MyRoutine.indexOf(originData);
      MyRoutineDummyData.MyRoutine[getIndex] = new_data;
      */
    }
    //navigate("/home", { replace: true });
  };

  console.log(startTime, endTime);
  const onRemove = () => {
    //백엔드 연동 실험
    if (window.confirm("루틴을 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/myRoutine/detail/${id}`, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
      alert("삭제완료");
      navigate("/home", { replace: true });
    } else {
      alert("취소되었습니다");
    }

    //백엔드 연동 실험 끝

    /*
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
    */
  };

  //월~일 요일 버튼 클릭 시 MyRoutineDummyData에 각각 요일 값 boolean 처리 함수
  const onClickRoutineRule = (e) => {
    switch (e.target.value) {
      case "mon":
        routineRules[0].mon = !routineRules[0].mon;
        if (routineRules[0].mon == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "tue":
        routineRules[0].tue = !routineRules[0].tue;
        if (routineRules[0].tue == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "wed":
        routineRules[0].wed = !routineRules[0].wed;
        if (routineRules[0].wed == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "thu":
        routineRules[0].thu = !routineRules[0].thu;
        if (routineRules[0].thu == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "fri":
        routineRules[0].fri = !routineRules[0].fri;
        if (routineRules[0].fri == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "sat":
        routineRules[0].sat = !routineRules[0].sat;
        if (routineRules[0].sat == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;
      case "sun":
        routineRules[0].sun = !routineRules[0].sun;
        if (routineRules[0].sun == true) {
          document.getElementById(e.target.id).style.backgroundColor = "blue";
        } else {
          document.getElementById(e.target.id).style.backgroundColor =
            "rgb(228, 228, 228)";
        }
        break;

      default:
    }
    console.log(routineRules);
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
              value="mon"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              월
            </button>
            <button
              id="tueBtn"
              value="tue"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              화
            </button>
            <button
              id="wedBtn"
              value="wed"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              수
            </button>
            <button
              id="thuBtn"
              value="thu"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              목
            </button>
            <button
              id="friBtn"
              value="fri"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              금
            </button>
            <button
              id="satBtn"
              value="sat"
              className="routineRule"
              onClick={onClickRoutineRule}
            >
              토
            </button>
            <button
              id="sunBtn"
              value="sun"
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
