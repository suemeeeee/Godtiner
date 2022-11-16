//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.

import MyButton from "../Components/MyButton";
import MyUpper from "../Components/MyUpper";
const Routine = () => {
  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />
      <MyButton text={"내 루틴에 담기"} />
    </div>
  );
};

export default Routine;
