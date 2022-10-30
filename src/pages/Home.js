import { useState } from "react";
import MySearchAlarm from "../Components/MySearchAlarm";

const Home = () => {
  //날짜를 저장하는 state
  const [curDate, setCurDate] = useState(new Date());

  //오늘 기준 날짜를 계산하는 함수
  const getAlldate = (today, lastday) => {
    let dates = [];
    dates[0] = today;
    for (let i = 1; i <= 7; i++) {
      today += 1;
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      } else {
        dates[i] = today;
      }
    }
    return dates;
  };

  const getAllweak = (todayWeak) => {
    let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weaklist = [];
    weaklist[0] = strWeak[todayWeak];
    for (let i = 1; i <= 6; i++) {
      todayWeak += 1;
      if (todayWeak > 6) {
        todayWeak = 0;
        weaklist[i] = strWeak[todayWeak];
      } else {
        weaklist[i] = strWeak[todayWeak];
      }
    }

    return weaklist;
  };

  //요일
  let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weaklist = [];
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  return (
    <div>
      <MySearchAlarm />
      <div className="current_date">
        <header>{headText}</header>
      </div>
      <div className="date_btn">
        <button>{`${curDate.getDay()}요일\n${curDate.getDate()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
        <button>{`${curDate.getFullYear()}`}</button>
      </div>
      <div className="routinSection">
        <input />
      </div>
    </div>
  );
};
export default Home;
