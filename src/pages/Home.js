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
import {
  IoIosAddCircle,
  IoIosShare,
  IoMdReorder,
  IoIosCalendar,
  IoMdArrowBack,
} from "react-icons/io";

const Home = () => {
  //   const MyRoutine = {
  //     routine_name: "건강루틴",

  //     mon: {},

  //     tue: {},

  //     wed: {},

  //     thu: {},

  //     fri: {},

  //     sat: {},

  //     sun: {},
  //   };

  const routineList = useContext(RoutineStateContext);
  const navigate = useNavigate();

  const [data, setData] = useState(routineList);

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
      <div className="routinSection">
        {data.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))}
      </div>
      <div>
        {/* <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => navigate("/new")} />
        </Fab> */}
        <IoIosAddCircle
          size="80"
          color="blue"
          position="fixed"
          right="50px"
          botton="300px"
          onClick={() => navigate("/new")}
        />
      </div>
    </div>
  );
};
export default Home;
