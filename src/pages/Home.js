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
  const navigate = useNavigate();

  const [data, setData] = useState(routineList);

  return (
    <div className="Home">
      <MySearchAlarm />
      <Calendar />
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
