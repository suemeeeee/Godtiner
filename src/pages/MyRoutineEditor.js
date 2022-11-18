// 내 루틴에서 세부 루틴을 눌렀을 때 수정하는 페이지

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutineStateContext } from "../App";
import RoutineEditor from "../Components/RoutineEditor";

const MyRoutineEditor = () => {
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const routineList = useContext(RoutineStateContext);

  useEffect(() => {
    if (routineList.length >= 1) {
      const targetRoutine = routineList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetRoutine) {
        setOriginData(targetRoutine);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, routineList]);

  return (
    <div>
      {originData && <RoutineEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default MyRoutineEditor;
