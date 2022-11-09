import { useContext, useState } from "react";
import { RoutineStateContext, ShareStateContext } from "../App";
import RoutineItem from "../Components/RoutineItem";

const ShareRoutine = () => {
  const routineList = useContext(RoutineStateContext);
  const { onShare } = useContext(ShareStateContext);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [routine, setRoutine] = useState(routineList);

  return (
    <div>
      <div>
        <h3>루틴이름</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <h3>루틴 소개글</h3>
        <textarea
          placeholder="이 루틴은 어떤 루틴인가요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {/* 공개 루틴 상세 설정 부분이 제일 어려움. 11월 9일 노션 기록 참조 요망 */}
      <div>
        <h3>공개 루틴 상세 설정</h3>
        {}
        {/* <RoutineItem> 컴포넌트를 사용하면 안됨. 왜냐하면 RoutineItem컴포넌트에서 상세루틴을 클릭시 상세루틴 수정 페이지로 옮길 것이기 때문임.  */}
        {/* {routine.map((it) => (
          <RoutineItem key={it.id} {...it} />
        ))} */}
      </div>
    </div>
  );
};

export default ShareRoutine;
