// 루틴 추가페이지
import MyUpper from "../Components/MyUpper";
import RoutineEditor from "../Components/RoutineEditor";

const New = () => {
  return (
    <div>
      <MyUpper text={"루틴 추가하기"} />
      <RoutineEditor />
    </div>
  );
};

export default New;
