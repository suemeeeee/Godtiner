//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.
import MyUpper from "../Components/MyUpper";
import { useParams } from "react-router-dom";

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
      <div>
        <img src={detailRoutine.RoutinePic}></img>
        <br />
        <h1>{detailRoutine.RoutineTitle}</h1>
        {detailRoutine.RoutineContent.map((it) => (
          <div style={{ diplay: "inline-block" }}>
            <div>{it[0]}</div> <div>{it[1]}</div> <div>{it[2]}</div>
          </div>
        ))}
        <h2>루틴 설명</h2>
        <div>{detailRoutine.RoutineIntro}</div>
        <h2>루틴 제공자</h2>
        <div>{detailRoutine.Routiner}</div>
      </div>
    </div>
  );
};

export default Routine;
