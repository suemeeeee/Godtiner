import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchAlarm from "../Components/MySearchAlarm";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./Home.css";
import Calendar from "../Components/Calendar";
import { RoutineStateContext } from "../App";
import RoutineItem from "../Components/RoutineItem";
import ShareIcon from "@mui/icons-material/Share";

const Home = () => {
  const routineList = useContext(RoutineStateContext);
  //newDate객체는 바로 날짜로 변환해주지 않는다.
  // 따라서, toISOString메서드를 사용한다. 이 메서드는 Date객체를 받아 yyyy-mm-dd-블라블라 형태로 반환
  // 이에 인덱싱을 통하여
  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const navigate = useNavigate();

  //날짜를 저장하는 state
  const [curDate, setCurDate] = useState(new Date());

  const [data, setData] = useState(routineList);

  //왜 +만 텍스트로 더해지지?
  return (
    <div className="Home">
      <MySearchAlarm />
      {/* Calendar컴포넌트 안에 버튼 눌렀을 때 캘린더 뜰 수 있게 하는걸로 수정하는 편이 낫다고 생각 */}
      {/* <div className="current_date">
        <input
          className="input_date"
          type="date"
          value={curDate}
          onChange={(e) => setCurDate(e.target.value)}
        />
      </div> */}
      <Calendar />
      {/* <div className="date_btn">
        <button>{curDate.slice(-2) - 3}</button>
        <button>{curDate.slice(-2) - 2}</button>
        <button>{curDate.slice(-2) - 1}</button>
        <button>{curDate.slice(-2) - 0}</button>
        <button>{curDate.slice(-2) + 1}</button>
        <button>{curDate.slice(-2) + 2}</button>
        <button>{curDate.slice(-2) + 3}</button>
      </div> */}
      <ShareIcon onClick={() => navigate("/shareroutine")} />
      <div className="routinSection">
        {data.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))}
      </div>
      <div>
        {/* <button className="addRoutine" onClick={() => navigate("/new")}>
          +
        </button> */}
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => navigate("/new")} />
        </Fab>
      </div>
    </div>
  );
};
export default Home;