//마이페이지에서 찜한 루틴 편집을 눌렀을 때, 나오는 페이지

import MyUpper from "../Components/MyUpper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./LikedRoutineEdit.css";

const LikedRoutineEdit = () => {
  const navigate = useNavigate();
  //내가 찜한 루틴을 담는 공간
  const [likedRoutine, setLikedRoutine] = useState([]);
  //편집버튼을 누른건지 on/off
  const [isEdit, setIsEdit] = useState(false);
  //찜하기를 해제할 루틴을 넣을 배열
  const [selectRoutine, setSelectRoutine] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/member/liked/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.result.data);
        setLikedRoutine(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //찜하기 해제 체크박스 함수
  //개별선택
  const routineCheckedElement = (checked, value) => {
    if (checked) {
      //눌리는 액션이 행해지면
      setSelectRoutine([...selectRoutine, parseInt(value)]);
    } else {
      setSelectRoutine(
        selectRoutine.filter((it) => parseInt(it) != parseInt(value))
      );
    }
  };
  console.log(selectRoutine);
  console.log(likedRoutine);

  //전체선택
  const routineCheckedAll = (checked) => {
    let newRoutineId = [];
    if (checked) {
      likedRoutine.forEach((it) => newRoutineId.push(it.likedId));
      setSelectRoutine(newRoutineId);
    } else {
      setSelectRoutine([]);
    }
  };

  const onClickedEdit = () => {
    setIsEdit(!isEdit);
  };

  //찜하기 해제 요청
  const onSubmit = () => {
    const deleteLikedRoutine = {
      likedIdList: selectRoutine,
    };
    axios
      .post("http://localhost:8080/member/liked/remove", deleteLikedRoutine, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("찜하기가 해제되었습니다");
        navigate("/mypage", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  console.log(likedRoutine);
  return (
    <div>
      <MyUpper text={"찜한 루틴 편집"} />
      <div className="LikedRoutineEdit">
        <div className="header_sre">
          {!isEdit && (
            <div>
              <p className="totalTitle_sre">
                찜한 루틴 총 {likedRoutine.length}개
              </p>
              <button className="editBtn_sre" onClick={onClickedEdit}>
                편집
              </button>
            </div>
          )}
          {isEdit && (
            <div className="selctAllHeader_sre">
              <p className="totalTitle_sre">전체선택</p>
              <input
                className="selectAllBox_sre"
                type="checkbox"
                onChange={(e) => routineCheckedAll(e.target.checked)}
                checked={
                  selectRoutine.length == likedRoutine.length ? true : false
                }
              />
              <button className="cancleEditBtn_sre" onClick={onClickedEdit}>
                편집취소
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="LikedRoutineEditBody_sre">
        {likedRoutine.map((it) => (
          <div
            className="RoutineItem_sre"
            key={it.likedId}
            onClick={() =>
              navigate(`/routine/${it.sharedId}`, {
                state: { imageUrl: `${it.detail_thumbnail}` },
              })
            }
          >
            {isEdit && (
              <input
                type="checkbox"
                className="editBoxItem_sre"
                value={it.likedId}
                onChange={(e) =>
                  routineCheckedElement(e.target.checked, e.target.value)
                }
                // 선택된 상태로 만들어 주는 요소 checked
                checked={
                  selectRoutine.includes(parseInt(it.likedId)) ? true : false
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
          <button className="deleteBtn_sre">삭제하기</button>
        </footer>
      )}
    </div>
  );
};

export default LikedRoutineEdit;
