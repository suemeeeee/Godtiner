import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchAlarm from "../Components/MySearchAlarm";
import "./Home.css";
import Calendar from "../Components/Calendar";
import MoveTab from "../Components/MoveTab";
import RoutineItem from "../Components/RoutineItem";
import {
  IoIosAddCircle,
  IoIosShare,
  IoMdReorder,
  IoIosCalendar,
  IoMdArrowBack,
} from "react-icons/io";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("내 루틴");
  //백엔드시험을 위해 설치함
  let routineData = [];

  useEffect(() => {
    axios
      .get("http://localhost:8080/myRoutine/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        //console.log(response.data.result.data.myContentsList);
        routineData = response.data.result.data.myContentsList;
        console.log(routineData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //백엔드 연동시험

  //여기까지가 연동시험

  return (
    <div className="Home">
      <MySearchAlarm />
      <Calendar />
      <IoMdReorder size="50" />
      <IoIosShare
        size="50"
        color=""
        onClick={() => navigate("/shareroutine")}
      />
      <div>
        {/* 일부러 위쪽으로 올림. 확인하기 위해서 */}
        <IoIosAddCircle
          size="80"
          color="blue"
          position="fixed"
          right="50px"
          botton="300px"
          onClick={() => navigate("/new")}
        />
      </div>
      <div className="routinename">
        <input
          className="routine_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="routinSection">
        {/* {MyRoutineDummyData.MyRoutine.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))} */}
        {/* 이하는 백엔드 실험을 위함 */}
        {routineData.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))}
        {/* 여기까지가 백엔드 실험을 위함 */}
      </div>
      <MoveTab />
    </div>
  );
};
export default Home;
