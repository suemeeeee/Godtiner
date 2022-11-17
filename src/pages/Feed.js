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
          <img></img>
          <text></text>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
