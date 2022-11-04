import { useState } from "react";

//import mui
import Switch from "@mui/material/Switch";
import MyButton from "./MyButton";

const RoutineEditor = () => {
  //세부루틴 이름
  const [name, setName] = useState("");
  return (
    <div className="RoutineEditor">
      <section>
        <div className="RoutinName">
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </section>
      <section>
        <div className="Notification">
          <span>알림 설정</span>
          <Switch />
        </div>
      </section>
      <section>
        <div className="timeDay">
          <div>시간 설정 </div>
          <input type="time" />
          <input type="time" />
        </div>
        <div>요일 반복</div>
      </section>
      <MyButton text={"추가하기"} />
    </div>
  );
};
export default RoutineEditor;
