//마이페이지에서 공유한 루틴 편집을 눌렀을 때, 나오는 창

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import "./SharedRoutineEdit.css";

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
        setSharedRoutine(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <div>
      <MyUpper text={"공유한 루틴 편집"} />
      <div className="SharedRoutineEdit">
        <div className="header_sre">
          {!isEdit && (
            <div>
              <p className="totalTitle_sre">
                공유한 루틴 총 {sharedRoutine.length}개
              </p>
              <button className="editBtn_sre" onClick={onClickedEdit}>
                편집
              </button>
            </div>
          )}
          {isEdit && (
            <div className="selectAllHeader_sre">
              <p className="totalTitle_sre">전체선택</p>
              <input
                className="selectAllBox_sre"
                type="checkbox"
                onChange={(e) => onRoutineCheckedAll(e.target.checked)}
                checked={
                  selectRoutine.length === sharedRoutine.length ? true : false
                }
              />
              <button className="cancleEditBtn_sre" onClick={onClickedEdit}>
                편집 취소
              </button>
            </div>
          )}
        </div>

        <div className="SharedRoutineEditBody_sre">
          {sharedRoutine.map((it) => (
            <div className="RoutineItem_sre" key={it.id}>
              {isEdit && (
                <input
                  type="checkbox"
                  className="editBoxItem_sre"
                  value={it.id}
                  onChange={(e) => {
                    onRoutineCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={
                    selectRoutine.includes(parseInt(it.id)) ? true : false
                  }
                />
              )}
              <img
                className="feedImg_sre"
                src={require(`C:/api/image/${it.feed_thumbnail}`)}
              ></img>
              <p className="feedTitle_sre">{it.title}</p>
            </div>
          ))}
        </div>

        {isEdit && (
          <footer className="buttonDiv_r" onClick={onSubmit}>
            <button className="deleteBtn_sre">공유삭제</button>
          </footer>
        )}
      </div>
    </div>
  );
};
export default SharedRoutineEdit;
