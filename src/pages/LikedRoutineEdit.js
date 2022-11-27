import MyUpper from "../Components/MyUpper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserDummyData from "../DummyData/UserDummyData.json";
import feedDummyData from "../DummyData/feedDummyData.json";

const LikedRoutineEdit = () => {
  const navigate = useNavigate();
  //유저가 like한 루틴의 아이디들을 배열에 담은 변수 ex) ['1', '3']
  const wishedId = UserDummyData.LikedRoutine.LikeId;
  //유저가 like한 루틴(객체)를 담은 변수 (임시로 1번 루틴 넣어둠)
  const [wishedList, setWishedList] = useState([]);

  //전체 루틴 데이터 돌면서 wishedId 배열에 그 루틴 아이디가 있으면
  // wishedList에 추가해주기
  //왜 안되지 ...
  // feedDummyData.Feed_Routine.map((w) => {
  //   console.log(wishedId);
  //   if (wishedList.includes(w.RoutineId)) {
  //     setWishedList([w, ...wishedList]);
  //   }
  //   console.log(wishedList);
  // });

  //나름대로 디버깅 해봤는데, 오류가 있음.
  //한번 랜더 하고, 코드 새롭게 고쳐서 저장하면 배열이 자꾸 늘어나
  //근데 또 새로고침 하면 다시 원래대로 돌아와...뭘까요
  wishedId.map((it) => {
    const newRou = feedDummyData.Feed_Routine[parseInt(it) - 1];
    //console.log(newRou);
    wishedList.push(newRou);
  });
  console.log(wishedList);

  return (
    <div>
      <MyUpper text={"찜한 루틴 편집"} />

      <div className="Routine_list">
        {wishedList.map((it) => (
          <div
            className="RoutineItem"
            key={it.id}
            onClick={() => navigate(`/routine/${it.RoutineId}`)}
          >
            <img className="feedImg" src={it.RoutinePic}></img>
            <br />
            <text className="feedTitle">{it.RoutineTitle}</text>
            <div className="feedTag">
              {/* #{it.RoutineTag[0]} #{it.RoutineTag[1]} */}
            </div>
            <div>
              <div className="feedback">
                ❤{it.Routine_like} 📥{it.Routine_save} 👀{it.Routine_look}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedRoutineEdit;
