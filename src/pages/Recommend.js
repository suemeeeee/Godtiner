// 추천페이지

import MySearchAlarm from "../Components/MySearchAlarm";
import MoveTab from "../Components/MoveTab";
import "./Recommend.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Recommend = () => {
  const [selectTag, setSelectTag] = useState([]);
  const [firstRecommend, setFirstRecommend] = useState([]);
  const [secondRecommend, setSecondRecommend] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feed/recommendation", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFirstRecommend(response.data.result.data.recommendList1);
        setSecondRecommend(response.data.result.data.recommendList2);
        setSelectTag(response.data.result.data.memberInterest);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(firstRecommend);
  console.log(secondRecommend);
  console.log(selectTag);

  const navigate = useNavigate();
  const onClickViewAll = () => {
    navigate("/viewall");
  };
  return (
    <div className="Recommend">
      <MySearchAlarm />
      <div className="RecommendElement">
        {/* <div>
          <span className="span_rm">✨인기루틴</span>
          <span className="span_rm_text" onClick={onClickViewAll}>
            view All
          </span>
        </div> */}
        <div className="firstRecommend">
          <div className="firstRecommend_txt">{`'${selectTag[0].tagName}' 관련 추천 루틴`}</div>
          <div>
            {firstRecommend.map((it) => (
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
        </div>
        <div className="secondRecommend">
          <div className="secondRecommend_txt">{`'${selectTag[1].tagName}' 관련 추천 루틴`}</div>
          <div>
            {secondRecommend.map((it) => (
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
        </div>
      </div>
      <MoveTab />
    </div>
  );
};

export default Recommend;
