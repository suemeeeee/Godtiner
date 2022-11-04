import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchAlarm from "../Components/MySearchAlarm";
import "./Home.css";

const Home = () => {
  //newDate객체는 바로 날짜로 변환해주지 않는다.
  // 따라서, toISOString메서드를 사용한다. 이 메서드는 Date객체를 받아 yyyy-mm-dd-블라블라 형태로 반환
  // 이에 인덱싱을 통하여
  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const navigate = useNavigate();

  //날짜를 저장하는 state
  const [curDate, setCurDate] = useState(getStringDate(new Date()));

  return (
    <div className="Home">
      <MySearchAlarm />
      <div className="current_date">
        <input
          className="input_date"
          type="date"
          value={curDate}
          onChange={(e) => setCurDate(e.target.value)}
        />
      </div>
      <div className="date_btn">
        <button>
          {curDate.slice(-2)}
          <br />
        </button>
        <button>{curDate.slice(-2)}</button>
        <button>{curDate.slice(-2)}</button>
        <button>{curDate.slice(-2)}</button>
        <button>{curDate.slice(-2)}</button>
        <button>{curDate.slice(-2)}</button>
        <button>{curDate.slice(-2)}</button>
      </div>
      <div className="routinSection"></div>
      <div>
        <button className="addRoutine" onClick={() => navigate("/new")}>
          +
        </button>
      </div>
    </div>
  );
};
export default Home;
