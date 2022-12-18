// 피드페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import feedDummyData from "../DummyData/feedDummyData.json";
import "./Feed.css";
import MoveTab from "../Components/MoveTab";
import MySearchAlram from "../Components/MySearchAlarm";

const Feed = () => {
  const navigate = useNavigate();
  const [AllRoutines, setAllRoutines] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedTagList, setSelectedTagList] = useState([]);

  const [likeSortedRoutineList, setLikeSortedRoutineList] = useState([]);
  const [pickSortedRoutineList, setPickSortedRoutineList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feed?sort=regdate,DESC")
      .then((Response) => {
        setTagList(Response.data.result.data.tagInfoList);
        setAllRoutines(Response.data.result.data.simpleLectureDtoList);
      })
      .catch((Error) => {
        console.log(Error);
      });

    axios.get("/feed?sort=likecnt,DESC").then((response) => {
      setLikeSortedRoutineList(response.data.result.data.simpleLectureDtoList);
    });
    axios.get("/feed?sort=pickcnt,DESC").then((response) => {
      setPickSortedRoutineList(response.data.result.data.simpleLectureDtoList);
    });
    document.getElementById("pick").style.display = "none";
    document.getElementById("like").style.display = "none";
  }, []);

  const onClickTagBtn = (e) => {
    //선택한 태그 네임 (ex. 일상)
    const tagName = e.target.value;
    console.log(tagName);
    axios
      .get(`http://localhost:8080/feed?tagName=${tagName}`)
      .then((Response) => {
        console.log(Response);
        setSelectedTagList(Response.data.result.data.simpleLectureDtoList);
      })
      .catch((Error) => {
        console.log(Error);
      });
    document.getElementById("tagSearch").style.display = "block";
    document.getElementById("all").style.display = "none";
  };
  console.log(selectedTagList);
  return (
    <div>
      <MySearchAlram />
      {/* <h2 style={{ fontSize: "40px" }}>🔍최신 루틴</h2> */}

      <div className="tagList_fd" onClick={onClickTagBtn}>
        {tagList.map((it) => (
          <button id={it.id} value={it.tagName} className="TagButton_fd">
            #{it.tagName}
          </button>
        ))}
      </div>

      <div className="menuTab_va">
        <span
          className="sort_like"
          onClick={() => {
            document.getElementById("like").style.display = "none";
            document.getElementById("pick").style.display = "none";
            document.getElementById("all").style.display = "block";
          }}
        >
          최신 순
        </span>
        <span
          className="sort_like"
          onClick={() => {
            document.getElementById("like").style.display = "block";
            document.getElementById("pick").style.display = "none";
            document.getElementById("all").style.display = "none";
          }}
        >
          좋아요 순
        </span>
        <span
          className="sort_save"
          onClick={() => {
            document.getElementById("like").style.display = "none";
            document.getElementById("pick").style.display = "block";
            document.getElementById("all").style.display = "none";
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
            onClick={() =>
              navigate(`/routine/${it.id}`, {
                id: it.id,
              })
            }
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
      <span id="all" className="Routine_list">
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

      <span id="tagSearch" className="Routine_list">
        {selectedTagList.map((it) => (
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
