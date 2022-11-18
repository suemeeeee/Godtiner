//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.
import MyUpper from "../Components/MyUpper";
import { useParams } from "react-router-dom";

import "./Routine.css";
import feedDummyData from "../DummyData/feedDummyData.json";

const Routine = () => {
  // 백엔드 통신 API 나중에 구현
  // 일단 더미 데이터로
  let { id } = useParams();
  console.log(id);

  let detailRoutine = feedDummyData.Feed_Routine.find((item) => {
    return item.RoutineId == id;
  });

  console.log(detailRoutine);
  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />

      <div className="Routine">
        <img className="RoutineImg" src={detailRoutine.RoutinePic}></img>
        <br />
        <h1 className="RoutineTitle">{detailRoutine.RoutineTitle}</h1>
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
        <h2 style={{ textAlign: "left", fontSize: "40px", marginLeft: "30px" }}>
          루틴 설명
        </h2>
        <div
          style={{ fontSize: "30px", textAlign: "left", marginLeft: "30px" }}
        >
          {detailRoutine.RoutineIntro}
        </div>
        <h2 style={{ textAlign: "left", fontSize: "40px", marginLeft: "30px" }}>
          루틴 제공자
        </h2>
        <div style={{ fontSize: "30px" }}>{detailRoutine.Routiner}</div>
      </div>
    </div>
  );
};

export default Routine;
