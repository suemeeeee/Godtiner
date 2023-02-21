import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("내 루틴");
  //백엔드시험을 위해 설치함
  //useEffect안에서 값을 정의하면 useEffect를 나오는 순간 값이 보존이 안됨..
  //구글링결과 useState를 이용해야 한다고 한다..
  const [routineData, setRoutineData] = useState([]);

  const today = new Date();

  console.log(today.getDay());
  useEffect(() => {
    axios
      .get(`http://localhost:8080/myRoutine/post/${today.getDay()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRoutineData(response.data.result.data.myContentsList);
        setName(response.data.result.data.title);
      })
      .catch((error) => {
        console.log(error);
      });
    // .then(
    //   axios
    //     .get(`http://localhost:8080/myRoutine/post`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     })
    //     .then((response) => {
    //       setRoutineData(response.data.result.data.myContentsList);
    //     })
    // );
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
    axios
      .put(
        "http://localhost:8080/myRoutine/post",
        {
          title: name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Home">
      <MySearchAlarm />
      <Calendar />
      <div className="ectBtn">
        <IoMdReorder className="SortButton" size="50" />
        <IoIosShare
          className="ShareRoutineButton"
          size="50"
          color=""
          onClick={() => navigate("/shareroutine")}
        />
      </div>
      <IoIosAddCircle
        className="AddRoutineButton"
        size="80"
        color="#0066ff"
        position="fixed"
        right="50px"
        botton="300px"
        onClick={() => navigate("/new")}
      />

      <input className="routine_name" value={name} onChange={onChangeName} />

      <div className="routinSection">
        {routineData.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))}
      </div>
      <MoveTab />
    </div>
  );
};
export default Home;
