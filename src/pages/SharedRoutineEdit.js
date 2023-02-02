//마이페이지에서 공유한 루틴 편집을 눌렀을 때, 나오는 창

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";

const SharedRoutineEdit = () => {
  const navigate = useNavigate();
  const [sharedRoutine, setSharedRoutine] = useState([]);
  //편집버튼을 누른건지 on/off
  const [isEdit, setIsEdit] = useState(false);
  //삭제할 루틴들을 넣을 공간
  const [selectRoutine, setSelectRoutine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/member/sharedRoutine/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.result.data);
        setSharedRoutine(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("내가 공유한 루틴들", sharedRoutine);

  const onClickedEdit = () => {
    setIsEdit(!isEdit);
  };

  // 체크박스 함수
  // 개별선택
  const onRoutineCheckedElement = (checked, value) => {
    if (checked) {
      setSelectRoutine([...selectRoutine, parseInt(value)]);
    } else {
      setSelectRoutine(
        selectRoutine.filter((it) => parseInt(it) !== parseInt(value))
      );
    }
  };

  // 전체선택
  const onRoutineCheckedAll = (checked) => {
    let newRoutineId = [];
    if (checked) {
      sharedRoutine.forEach((it) => newRoutineId.push(it.id));
      setSelectRoutine(newRoutineId);
    } else {
      setSelectRoutine([]);
    }
  };
  console.log(selectRoutine);

  // 삭제 요청
  const onSubmit = () => {
    const deleteSharedRoutine = {
      routineIdList: selectRoutine,
    };
    axios
      .post("http://localhost:8080/sharedRoutine/remove", deleteSharedRoutine, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("삭제되었습니다");
        navigate("/mypage", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="SharedRoutineEdit">
      <MyUpper text={"공유한 루틴 편집"} />
      <div className="isEditMode">
        {!isEdit && (
          <div>
            <span>찜한 루틴 {sharedRoutine.length}</span>
            <span onClick={onClickedEdit}>편집</span>
          </div>
        )}
        {isEdit && (
          <div>
            <span>전체선택</span>
            <input
              type="checkbox"
              onChange={(e) => onRoutineCheckedAll(e.target.checked)}
              checked={
                selectRoutine.length === sharedRoutine.length ? true : false
              }
            />
          </div>
        )}
      </div>
      <div className="SharedRoutineEditBody">
        {sharedRoutine.map((it) => (
          <div className="RoutineItem" key={it.id}>
            {isEdit && (
              <input
                type="checkbox"
                className="EditBox"
                value={it.id}
                onChange={(e) => {
                  onRoutineCheckedElement(e.target.checked, e.target.value);
                }}
                checked={selectRoutine.includes(parseInt(it.id)) ? true : false}
              />
            )}
            <img
              className="feedImg"
              src={require(`C:/api/image/${it.feed_thumbnail}`)}
            ></img>
            <br />
            <span className="feedTitle">{it.title}</span>
          </div>
        ))}
      </div>
      {isEdit && (
        <footer className="buttonDiv_r" onClick={onSubmit}>
          <button className="SaveButton_r">공유삭제</button>
        </footer>
      )}
    </div>
  );
};
export default SharedRoutineEdit;
