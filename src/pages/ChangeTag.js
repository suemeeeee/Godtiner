import axios from "axios";
import MyUpper from "../Components/MyUpper";

const ChangeTag = () => {
  return (
    <div>
      <MyUpper text={"관심사 태그 변경"} />
      <h3>현재 설정된 관심사 태그는</h3>
    </div>
  );
};

export default ChangeTag;
