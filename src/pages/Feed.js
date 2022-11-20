// 피드페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import feedDummyData from "../DummyData/feedDummyData.json";
import "./Feed.css";
import MoveTab from "../Components/MoveTab";

const Feed = () => {
  const navigate = useNavigate();
  const [AllRoutines, setAllRoutines] = useState();

  useEffect(() => {
    Axios.get("http://localhost:8080//feed/all")
      .then((Response) => {
        console.log(Response.data);
        setAllRoutines(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "40px" }}>🔍최신 루틴</h2>
      <div className="Routine_list">
        {feedDummyData.Feed_Routine.map((it) => (
          <div
            className="RoutineItem"
            key={it.id}
            onClick={() => navigate(`/routine/${it.RoutineId}`)}
          >
            <img className="feedImg" src={it.RoutinePic}></img>
            <br />
            <text className="feedTitle">{it.RoutineTitle}</text>
            <div className="feedTag">
              #{it.RoutineTag[0]} #{it.RoutineTag[1]}
            </div>
            <div>
              <div className="feedback">
                ❤{it.Routine_like} 📥{it.Routine_save} 👀{it.Routine_look}
              </div>
            </div>
          </div>
        ))}
      </div>
      <MoveTab />
    </div>
  );
};

export default Feed;
