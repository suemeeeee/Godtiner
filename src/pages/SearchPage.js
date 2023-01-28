import MySearchAlarm from "../Components/MySearchAlarm";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyUpper from "../Components/MyUpper";
import MoveTab from "../Components/MoveTab";
import "./SearchPage.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);

  //넘겨받은 검색 결과 데이터를 searchedData에 넣어 줌
  function parentFunction(x) {
    setSearchedData(x);
  }

  //검색 창 전용 MyUpper 필요한데...
  return (
    <div>
      <MySearchAlarm parentFunction={parentFunction} />
      <div className="SearchPageDiv">
        {searchedData.map((it) => (
          <div
            className="RoutineItem"
            key={it.id}
            onClick={() => navigate(`/routine/${it.id}`)}
          >
            <img
              className="feedImg"
              src={require(`C:/api/image/${it.feed_thumbnail}`)}
            ></img>
            <br />
            <text className="feedTitle">{it.title}</text>
            <div className="feedTag">
              {it.routineTagList.map((tag) => (
                <a>#{tag.tag.tagName} </a>
              ))}
            </div>
            <div>
              <div className="feedback">
                ❤{it.likecnt} 📥{it.pickcnt} 👀{it.hits}
              </div>
            </div>
          </div>
        ))}
      </div>
      <MoveTab />
    </div>
  );
};

export default SearchPage;
