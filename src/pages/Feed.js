// 피드페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import feedDummyData from "../DummyData/feedDummyData.json";

const Feed = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>🔍최신 루틴</h2>
      <div className="Routine_list">
        <div>
          {feedDummyData.Feed_Routine.map((it) => (
            <div
              key={it.RoutineId}
              onClick={() => navigate(`/routine/${it.RoutineId}`)}
            >
              <img src={it.RoutinePic}></img>
              <br />
              <text>{it.RoutineTitle}</text>
              <div>{it.RoutineTag}</div>
              <div>
                <div>
                  ❤{it.Routine_like} 📥{it.Routine_save} 👀{it.Routine_look}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
