// 추천페이지

import MySearchAlarm from "../Components/MySearchAlarm";
import MoveTab from "../Components/MoveTab";
import "./Recommend.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Recommend = () => {
  const [firstTag, setFirstTag] = useState("");
  const [secondTag, setSecondTag] = useState("");
  const [firstRecommend, setFirstRecommend] = useState([]);
  const [secondRecommend, setSecondRecommend] = useState([]);
  const [itemRecommend, setItemRecommend] = useState([]);

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
        setFirstTag(response.data.result.data.memberInterest[0].tagName);
        setSecondTag(response.data.result.data.memberInterest[1].tagName);
        setItemRecommend(response.data.result.data.item_matrix_recommend);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(firstTag);
  const navigate = useNavigate();
  const onClickViewAll = () => {
    navigate("/viewall");
  };
  return (
    <div className="Recommend">
      <MySearchAlarm />
      <div className="RecommendElement">
        <div className="firstRecommend">
          <h1>{`✨'${firstTag}' 관련 추천 루틴✨`}</h1>
          <div className="routineItems--div">
            {firstRecommend.map((it) => (
              <div
                className="RoutineItem"
                key={it.id}
                onClick={() =>
                  navigate(`/routine/${it.id}`, {
                    state: { imageUrl: `${it.detail_thumbnail}` },
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
          <h1>{`✨'${secondTag}' 관련 추천 루틴✨`}</h1>
          <div className="routineItems--div">
            {secondRecommend.map((it) => (
              <div
                className="RoutineItem"
                key={it.id}
                onClick={() =>
                  navigate(`/routine/${it.id}`, {
                    state: { imageUrl: `${it.detail_thumbnail}` },
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
        <div className="itemRecommend">
          <h1>✨맞춤 추천✨</h1>
          <div className="routineItems--div">
            {itemRecommend.map((it) => (
              <div
                className="RoutineItem"
                key={it.id}
                onClick={() =>
                  navigate(`/routine/${it.id}`, {
                    state: { imageUrl: `${it.detail_thumbnail}` },
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
