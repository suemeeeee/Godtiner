// 개인 루틴을 추가하는 페이지
import MyUpper from "../Components/MyUpper";
import RoutineEditor from "../Components/RoutineEditor";
import "./New.css";
const New = () => {
  return (
    <div>
      <MyUpper text={"루틴 추가하기"} />
      <RoutineEditor />
    </div>
  );
};

export default New;
