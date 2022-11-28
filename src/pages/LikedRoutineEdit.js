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
