// 피드페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import feedDummyData from "../DummyData/feedDummyData.json";
import "./Feed.css";
import MoveTab from "../Components/MoveTab";
import MySearchAlram from "../Components/MySearchAlarm";

const Feed = () => {
  const navigate = useNavigate();
  const [AllRoutines, setAllRoutines] = useState([]);
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/feed?sort=regdate,DESC")
      .then((Response) => {
        console.log(Response);
        setTagList(Response.data.result.data.tagInfoList);
        setAllRoutines(Response.data.result.data.simpleLectureDtoList);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  console.log(AllRoutines);
  console.log(tagList);

  const onClickTagBtn = (e) => {
    //선택한 태그 네임 (ex. 일상)
    const tagNam = e.target.value;
  };

  return (
    <div>
      <MySearchAlram />
      <h2 style={{ fontSize: "40px" }}>🔍최신 루틴</h2>
      <div className="tagList_fd">
        {tagList.map((it) => (
          <button id={it.id} value={it.tagName} className="TagButton_fd">
            #{it.tagName}
          </button>
        ))}
      </div>

      <span className="Routine_list">
        {AllRoutines.map((it) => (
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
      </span>
      <MoveTab />
    </div>
  );
};

export default Feed;
