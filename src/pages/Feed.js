// 피드페이지
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Feed.css";
import MoveTab from "../Components/MoveTab";
import MySearchAlram from "../Components/MySearchAlarm";

import Paging from "../Components/Paging";

const Feed = () => {
  const navigate = useNavigate();
  const [AllRoutines, setAllRoutines] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [tagBtn, setTagBtn] = useState();
  const [sortState, setSortState] = useState("");

  const [totalElementCount, setTotalElementCount] = useState();

  const [totalPageNum, setTotalPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [likeSortedRoutineList, setLikeSortedRoutineList] = useState([]);
  const [pickSortedRoutineList, setPickSortedRoutineList] = useState([]);

  const [isOpen, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen); // on,off 개념 boolean
  };

  useEffect(() => {
    document.getElementById("pick").style.display = "none";
    document.getElementById("like").style.display = "none";
    if (tagBtn === false) {
      document.getElementById("tagSearch").style.display = "none";
      document.getElementById("all").style.display = "block";
      axios
        .get(`http://localhost:8080/feed?sort=regdate,DESC`)
        .then((Response) => {
          console.log(Response);
          setTotalElementCount(Response.data.result.data.totalElementCount);
        });
    }
  }, [tagBtn]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/feed?page=${currentPage}&sort=regdate,DESC`)
      .then((Response) => {
        console.log(Response);
        setTagList(Response.data.result.data.tagInfoList);
        setAllRoutines(Response.data.result.data.simpleLectureDtoList);
        setTotalPageNum(Response.data.result.data.totalPageCount);
        setTotalElementCount(Response.data.result.data.totalElementCount);
      })
      .catch((Error) => {
        console.log(Error);
      });

    axios
      .get(`http://localhost:8080/feed?page=${currentPage}&sort=likecnt,DESC`)
      .then((response) => {
        setLikeSortedRoutineList(
          response.data.result.data.simpleLectureDtoList
        );
        setTotalElementCount(Response.data.result.data.totalElementCount);
      });

    axios
      .get(`/feed?page=${currentPage}&sort=pickcnt,DESC`)
      .then((response) => {
        setPickSortedRoutineList(
          response.data.result.data.simpleLectureDtoList
        );
        setTotalElementCount(Response.data.result.data.totalElementCount);
      });
  }, [currentPage, sortState]);

  const onClickTagBtn = (e) => {
    const tagName = e.target.value;
    if (tagBtn === true) {
      setTagBtn(false);
    } else {
      setTagBtn(true);
    }

    if (e.target.className === "TagButton_fd") {
      e.target.className = "clicked_fd";
    } else {
      e.target.className = "TagButton_fd";
    }
    if (sortState === "like") {
      axios
        .get(
          `http://localhost:8080/feed?page=${currentPage}&sort=likecnt,DESC&tagName=${tagName}`
        )
        .then((Response) => {
          console.log(Response);
          setSelectedTagList(Response.data.result.data.simpleLectureDtoList);
          setTotalElementCount(Response.data.result.data.totalElementCount);
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else if (sortState === "pick") {
      axios
        .get(
          `http://localhost:8080/feed?page=${currentPage}&sort=pickcnt,DESC&tagName=${tagName}`
        )
        .then((Response) => {
          console.log(Response);
          setSelectedTagList(Response.data.result.data.simpleLectureDtoList);
          setTotalElementCount(Response.data.result.data.totalElementCount);
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else {
      {
        axios
          .get(`http://localhost:8080/feed?tagName=${tagName}`)
          .then((Response) => {
            console.log(Response);
            setSelectedTagList(Response.data.result.data.simpleLectureDtoList);
            setTotalElementCount(Response.data.result.data.totalElementCount);
          })
          .catch((Error) => {
            console.log(Error);
          });
      }
    }
    document.getElementById("tagSearch").style.display = "block";
    document.getElementById("all").style.display = "none";
    document.getElementById("pick").style.display = "none";
    document.getElementById("like").style.display = "none";
  };

  console.log(totalElementCount);
  const onClickPageBtn = (e) => {
    console.log(e.target.value);
    setCurrentPage(e.target.value);
    console.log(currentPage);
  };

  const createPageBtn = () => {
    let firstNum = currentPage - (currentPage % 5) + 1;
    let lastNum = currentPage - (currentPage % 5) + 5;

    const onClick_lt_btn = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    const onClick_gt_btn = () => {
      if (currentPage + 1 < totalPageNum) {
        setCurrentPage(currentPage + 1);
      }
      if (currentPage + 1 === lastNum) {
      }
    };

    const btnArr = [<button onClick={onClick_lt_btn}>&lt;</button>];

    if (totalPageNum > 5) {
      for (let i = firstNum; i <= lastNum; i++) {
        btnArr.push(
          <button className="pageBtn" value={i - 1} onClick={onClickPageBtn}>
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPageNum; i++) {
        btnArr.push(
          <button className="pageBtn" value={i - 1} onClick={onClickPageBtn}>
            {i}
          </button>
        );
      }
    }
    btnArr.push(<button onClick={onClick_gt_btn}>&gt;</button>);
    return btnArr;
  };

  const onClickSortBtn = (e) => {
    let sort = e.target.textContent;
    setCurrentPage(0);
    console.log(currentPage);

    if (sort === "좋아요순") {
      document.getElementById("like").style.display = "block";
      document.getElementById("pick").style.display = "none";
      document.getElementById("all").style.display = "none";
      document.getElementById("tagSearch").style.display = "none";
      setSortState("like");
    } else if (sort === "담기순") {
      document.getElementById("like").style.display = "none";
      document.getElementById("pick").style.display = "block";
      document.getElementById("all").style.display = "none";
      document.getElementById("tagSearch").style.display = "none";
      setSortState("pick");
    } else {
      document.getElementById("like").style.display = "none";
      document.getElementById("pick").style.display = "none";
      document.getElementById("all").style.display = "block";
      document.getElementById("tagSearch").style.display = "none";
      setSortState("recent");
    }
  };

  const handlePageChange = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  return (
    <div>
      <MySearchAlram />
      <Paging
        page={currentPage}
        count={totalElementCount}
        setPage={handlePageChange}
      />
      <div className="menuTab_va">
        <p className="sortBtn_fd" onClick={onClickSortBtn}>
          최신순
        </p>
        <p className="sortBtn_fd" onClick={onClickSortBtn}>
          좋아요순
        </p>
        <p className="sortBtn_fd" onClick={onClickSortBtn}>
          담기순
        </p>
      </div>
      <hr size="10px" width="90%" />
      <p className="toggle_icon" onClick={toggleMenu}>
        ▼
      </p>
      <div
        className={isOpen ? "show_tagList_fd" : "hide_tagList_fd"}
        // onClick={onClickTagBtn}
      >
        {tagList.map((it) => (
          <button
            className="TagButton_fd"
            id={it.id}
            value={it.tagName}
            onClick={onClickTagBtn}
          >
            {it.tagName}
          </button>
        ))}
      </div>

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

      <div id="all" className="Routine_list">
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
      </div>

      <div id="tagSearch" className="Routine_list">
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
      </div>
      {/* <div className="pageNumDiv">{createPageBtn()}</div> */}
      <MoveTab />
    </div>
  );
};

export default Feed;
