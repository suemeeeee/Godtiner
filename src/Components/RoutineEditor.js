import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./RoutineEditor.css";
import axios from "axios";

const RoutineEditor = ({ isEdit, originData }) => {
  //세부루틴 이름
  const [content, setContent] = useState("");
  //시작시간
  const [startTime, setStartTime] = useState("");
  //끝나는 시간
  const [endTime, setEndTime] = useState("");

  const location = useLocation();

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

  if (isEdit) {
    const myMyRules = location.state.myRules;
    console.log(myMyRules);
    routineRules = myMyRules;
  }

  console.log("routineRules", routineRules);

  const contentRef = useRef();
  const navigate = useNavigate();

  //수정 및 삭제를 위해서
  const { id } = useParams();
  console.log(id);

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
    for (let key in routineRules[0]) {
      const ruleValue = routineRules[0][key];
      if (ruleValue === true) {
        let ruleBtn = document.getElementById(`${key}Btn`);
        ruleBtn.classList = "routineRule_active";
      }
    }

    if (isEdit) {
      setStartTime(originData.startTime);
      setEndTime(originData.endTime);
      setContent(originData.content);
      routineRules = originData.routineRules;
    }
  }, [isEdit, originData]);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (!isEdit) {
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
    } else {
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
    }
  };

  const onRemove = () => {
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

    alert("삭제 완료");
    navigate("/home", { replace: true });
  };

  const onClickRoutineRule = (e) => {
    if (e.target.className === "routineRule") {
      e.target.className = "routineRule_active";
    } else {
      e.target.className = "routineRule";
    }

    switch (e.target.value) {
      case "mon":
        routineRules[0].mon = !routineRules[0].mon;
        break;
      case "tue":
        routineRules[0].tue = !routineRules[0].tue;
        break;
      case "wed":
        routineRules[0].wed = !routineRules[0].wed;
        break;
      case "thu":
        routineRules[0].thu = !routineRules[0].thu;
        break;
      case "fri":
        routineRules[0].fri = !routineRules[0].fri;
        break;
      case "sat":
        routineRules[0].sat = !routineRules[0].sat;
        break;
      case "sun":
        routineRules[0].sun = !routineRules[0].sun;
        break;

      default:
    }
    console.log(routineRules);
  };

  return (
    <div className="RoutineEditor">
      <div className="RoutinName">
        <input
          className="NameBox"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="timeDay">
        <p className="text_re">시간 설정</p>
        <div className="time--edit">
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
      </div>

      <div className="routineRules_div">
        <p className="text_re">요일 반복</p>
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

      <button className="removeText" onClick={onRemove}>
        {isEdit ? "삭제하기" : " "}
      </button>

      <footer className="buttonDiv_re">
        <button className="SaveButton_re" onClick={handleSubmit}>
          {isEdit ? "수정하기" : "추가하기"}
        </button>
      </footer>
    </div>
  );
};

export default RoutineEditor;
