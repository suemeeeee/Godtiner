//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.
import MoveTab from "../Components/MoveTab";
import MyUpper from "../Components/MyUpper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Routine.css";

const Routine = () => {
  //내 루틴으로 가져오는 데 사용할 변수들(스크랩기능)
  const [selectRoutine, setSelectRoutine] = useState([]);
  const [postRoutineId, setPostRoutineId] = useState(0);

  const [recommendedRoutine, setRecommendedRoutine] = useState([]);
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("");

  const [detailRoutine, setDetailRoutine] = useState([]);

  const [nickName, setNickName] = useState("");

  const [isLiked, setIsLiked] = useState(false);

  const [sharedContents, setSharedContents] = useState([]);

  const routineId = useParams();
  let params = routineId.id;

  const auth = `Bearer ${localStorage.getItem("token")}`;

  const location = useLocation();
  const detailKey = { ...location.state };

  console.log(detailKey);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/feed/${params}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((Response) => {
        console.log(Response);
        setPostRoutineId(Response.data.result.data.id);
        setDetailRoutine(Response.data.result.data);
        setSharedContents(Response.data.result.data.sharedContentsList);
        setNickName(Response.data.result.data.member.nickname);
        setRecommendedRoutine(Response.data.result.data.contentsBasedRecommend);

        if (Response.data.result.data.liked) {
          setButtonText("❤️");
          setIsLiked(true);
        } else {
          setButtonText("🤍");
          setIsLiked(false);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [params]);

  //좋아요 누르면 넘겨줄 함수 (false를 true로 바꾸고 꽉찬 하트로)
  const wishAddHandler = () => {
    if (!isLiked) {
      axios.post(
        `http://localhost:8080/sharedRoutine/${params}/liked`,
        {},
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setButtonText("💙");
      setIsLiked(true);
    } else {
      axios.delete(`http://localhost:8080/sharedRoutine/${params}/liked`, {
        headers: {
          Authorization: auth,
        },
      });
      setButtonText("🤍");
      setIsLiked(false);
    }
  };

  //체크박스로 루틴을 골라보자(개별ver.)
  const onRoutineCheckedElement = (checked, value) => {
    if (checked) {
      setSelectRoutine([...selectRoutine, parseInt(value)]);
    } else {
      setSelectRoutine(
        selectRoutine.filter((it) => parseInt(it) !== parseInt(value))
      );
    }
  };

  //체크박스로 루틴을 모두 골라보자(allver.)
  const onRoutineCheckedAll = (checked) => {
    let newRoutineId = [];
    if (checked) {
      sharedContents.forEach((it) => newRoutineId.push(it.id));
      setSelectRoutine(newRoutineId);
    } else {
      setSelectRoutine([]);
    }
  };

  //내 루틴으로 가져오는 함수
  const onPush = () => {
    const addnewRoutineId = {
      contentIdList: selectRoutine,
    };
    axios
      .post(`/sharedRoutine/pick/${params}`, addnewRoutineId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (window.confirm("내 루틴에 담겼습니다. 확인하시겠습니까?")) {
          navigate("/home", { replace: true });
        } else {
          navigate("/feed", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  console.log(detailRoutine);
  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />

      <div className="Routine">
        <img
          className="RoutineImg"
          src={require(`C:/api/image/${detailKey.imageUrl}`)}
        ></img>

        <br />
        <h1 className="RoutineTitle">{detailRoutine.title}</h1>

        <div className="checkAll_div">
          <input
            className="checkAll"
            type="checkbox"
            onChange={(e) => onRoutineCheckedAll(e.target.checked)}
            checked={
              selectRoutine.length == sharedContents.length ? true : false
            }
          />
          <p>전체선택</p>
          <button className="like_r" onClick={wishAddHandler}>
            {buttonText}
          </button>
        </div>

        <div className="routineBody">
          {sharedContents &&
            sharedContents.map((it) => (
              <div className="RoutineDetail">
                <input
                  className="checkbox_rt"
                  type="checkbox"
                  value={it.id}
                  onChange={(e) => {
                    onRoutineCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={
                    selectRoutine.includes(parseInt(it.id)) ? true : false
                  }
                />
                <span className="RoutineTime_rt">
                  <span>{it.startTime}</span>-<span>{it.endTime}</span>
                </span>
                <span className="RoutineContent_rt">{it.content}</span>
              </div>
            ))}
        </div>

        <div className="routine--info">
          <h2>📝 루틴 설명</h2>
          <p>{detailRoutine.routine_content}</p>
          <h2>🐳 루틴 제공자</h2>
          <p>{nickName}</p>
        </div>
        <div className="routine--recommend--div">
          <h2>💙 이 루틴과 비슷한 루틴</h2>
          <div className="routineItems_rt">
            {recommendedRoutine.map((it) => (
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
                <p className="feedTitle">{it.title}</p>
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
        </div>

        <button className="SaveButton_r" onClick={onPush}>
          저장하기
        </button>
        <MoveTab />
      </div>
    </div>
  );
};

export default Routine;
