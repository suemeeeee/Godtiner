// 피드페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import feedDummyData from "../DummyData/feedDummyData.json";
import "./Feed.css";
import MoveTab from "../Components/MoveTab";
const Feed = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ fontSize: "40px" }}>🔍최신 루틴</h2>
      <div className="Routine_list">
        {feedDummyData.Feed_Routine.map((it) => (
          <div
            className="RoutineItem"
            key={it.RoutineId}
            onClick={() => navigate(`/routine/${it.RoutineId}`)}
          >
            <img className="feedImg" src={it.RoutinePic}></img>
            <br />
            <text className="feedTitle">{it.RoutineTitle}</text>
            <div className="feedTag">{it.RoutineTag}</div>
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
