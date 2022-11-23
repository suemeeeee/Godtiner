//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.
import MyUpper from "../Components/MyUpper";
import { useParams } from "react-router-dom";
import { useState } from "react";

import "./Routine.css";
import UserDummyData from "../DummyData/UserDummyData.json";
import feedDummyData from "../DummyData/feedDummyData.json";
import MoveTab from "../Components/MoveTab";

const Routine = () => {
  const [buttonText, setButtonText] = useState("🤍");
  // 백엔드 통신 API 나중에 구현
  // 일단 더미 데이터로
  let { id } = useParams();
  console.log(id);

  // if (
  //   UserDummyData.LikedRoutine.LikeId.find(
  //     (f) => f === UserDummyData.LikedRoutine.LikeId
  //   )
  // ) {
  //   setButtonText("❤️");
  // }

  let detailRoutine = feedDummyData.Feed_Routine.find((item) => {
    return parseInt(item.RoutineId) == parseInt(id);
  });

  console.log(detailRoutine);

  const Like = (e) => {
    if (buttonText === "🤍") {
      setButtonText("❤️");
      UserDummyData.LikedRoutine.LikeId.push(id);
    } else {
      setButtonText("🤍");
      UserDummyData.LikedRoutine.LikeId.pop(id);
    }
    console.log(UserDummyData.LikedRoutine.LikeId);
  };

  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />

      <div className="Routine">
        <img className="RoutineImg" src={detailRoutine.RoutinePic}></img>
        <br />
        <h1 className="RoutineTitle">{detailRoutine.RoutineTitle}</h1>
        <div style={{ textAlign: "left", marginLeft: "30px" }}>
          <input className="checkAll" type="checkbox" /> 전체선택
          <button className="like_r" onClick={Like}>
            {buttonText}
          </button>
        </div>
        {detailRoutine.RoutineContent.map((it) => (
          <div className="RoutineDetail">
            <input className="checkbox" type="checkbox" />
            <span className="RoutineTime">
              <span className="RoutineStartTime">{it[0]}</span>
              <span className="RoutineEndTime">{it[1]}</span>
            </span>
            <span className="RoutineContent">{it[2]}</span>
          </div>
        ))}
        <h2 style={{ textAlign: "left", fontSize: "35px", marginLeft: "30px" }}>
          루틴 설명
        </h2>
        <div
          style={{ fontSize: "25px", textAlign: "left", marginLeft: "30px" }}
        >
          {detailRoutine.RoutineIntro}
        </div>
        <h2 style={{ textAlign: "left", fontSize: "35px", marginLeft: "30px" }}>
          루틴 제공자
        </h2>
        <div style={{ fontSize: "25px" }}>{detailRoutine.Routiner}</div>
        <div>
          <button className="ShareButton_sr">저장하기</button>
        </div>
      </div>
      <MoveTab />
    </div>
  );
};

export default Routine;
