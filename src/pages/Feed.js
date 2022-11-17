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
          {/* map() 함수 써서 더미데이터를 반복적으로 띄워줘야 할 듯.. 근데 아직 map 함수 약해서 공부해 올게 ㅜㅜ */}
          <img></img>
          <text></text>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
