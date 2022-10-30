import { useState } from "react";
import MySearchAlarm from "../Components/MySearchAlarm";

const Home = () => {
  //날짜를 저장하는 state
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  return (
    <div>
      <MySearchAlarm />
      <div className="current_date">
        <header>{headText}</header>
      </div>
    </div>
  );
};
export default Home;
