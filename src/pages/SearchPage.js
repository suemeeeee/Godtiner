import MySearchAlarm from "../Components/MySearchAlarm";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
const SearchPage = () => {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);
  const parentFunction = (x) => {
    setSearchedData(x);
  };

  console.log(searchedData);
  //검색 창 전용 MyUpper 필요한데...
  return (
    <div>
      {/* <MyUpper /> */}
      <MySearchAlarm parentFunction={parentFunction} />
      <div>
        {searchedData.map((it) => (
          <div
            className="RoutineItem"
            key={it.id}
            onClick={() => navigate(`/routine/${it.RoutineId}`)}
          >
            <img className="feedImg" src={it.RoutinePic}></img>
            <br />
            <text className="feedTitle">{it.RoutineTitle}</text>
            <div className="feedTag">
              #{it.RoutineTag[0]} #{it.RoutineTag[1]}
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

export default SearchPage;
