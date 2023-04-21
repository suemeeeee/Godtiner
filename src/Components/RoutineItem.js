import "./RoutineItem.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoutineItem = ({ id, content, startTime, endTime, myRules }) => {
  // home화면에서 세부 루틴들을 보여줌

  if (startTime === null && endTime === null) {
    startTime = "00:00";
    endTime = "00:00";
  }
  const navigate = useNavigate();

  // 체크박스 누르면 루틴 클리어 되면서 지워지는 함수
  const routineClear = (e) => {
    axios
      .put(`http://localhost:8080/myRoutine/clear/${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(myRules);

  const onClickContent = () => {
    navigate(`/myroutineeditor/${id}`, {
      state: { myRules: myRules },
    });
    console.log(id);
  };

  return (
    <div className="routineGroup">
      <p className="time">
        {startTime}-{endTime}
      </p>
      <button id={id} className="MyRoutineContent" onClick={onClickContent}>
        {content}
      </button>
      <input
        className="myRoutineCheckbox"
        value={id}
        type="checkbox"
        onClick={routineClear}
      />
    </div>
  );
};
export default RoutineItem;
