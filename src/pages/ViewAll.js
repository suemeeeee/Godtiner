import MySearchAlarm from "../Components/MySearchAlarm";
import MoveTab from "../Components/MoveTab";
import MyUpper from "../Components/MyUpper";
import "./RecommendSort.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutineItem from "../Components/RoutineItem";

const ViewAll = () => {
  const navigate = useNavigate();

  const [likeSortedRoutineList, setLikeSortedRoutineList] = useState([]);
  const [pickSortedRoutineList, setPickSortedRoutineList] = useState([]);

  useEffect(() => {
    axios.get("/feed?sort=likecnt,DESC").then((response) => {
      setLikeSortedRoutineList(response.data.result.data.simpleLectureDtoList);
    });
    axios.get("/feed?sort=pickcnt,DESC").then((response) => {
      setPickSortedRoutineList(response.data.result.data.simpleLectureDtoList);
    });
    document.getElementById("pick").style.display = "none";
  }, []);

  return (
    <div>
      <MySearchAlarm />
      <MyUpper />
      <div className="menuTab_va">
        <span
          className="sort_like"
          onClick={() => {
            document.getElementById("like").style.display = "block";
            document.getElementById("pick").style.display = "none";
          }}
        >
          좋아요 순
        </span>
        <span
          className="sort_save"
          onClick={() => {
            document.getElementById("like").style.display = "none";
            document.getElementById("pick").style.display = "block";
          }}
        >
          담기 순
        </span>
      </div>
      <hr size="10px" width="90%" />
      <div id="like" className="sortedList_div">
        {likeSortedRoutineList.map((it) => (
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
            <span className="feedTitle">{it.title}</span>
            <div className="feedTag">
              {}
              {}
            </div>
            <div>
              <div className="feedback">
                ❤{it.likecnt} 📥{it.pickcnt} 👀{it.hits}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="pick" className="sortedList_div">
        {pickSortedRoutineList.map((it) => (
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
            <span className="feedTitle">{it.title}</span>
            <div className="feedTag">
              {}
              {}
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

export default ViewAll;
