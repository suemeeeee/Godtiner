//루틴 상세페이지
//다른 사람들의 루틴을 보는 페이지 입니다.
import MyUpper from "../Components/MyUpper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Routine.css";
import UserDummyData from "../DummyData/UserDummyData.json";
import feedDummyData from "../DummyData/feedDummyData.json";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";
import MoveTab from "../Components/MoveTab";

const Routine = () => {
  //내 루틴으로 가져오는 데 사용할 변수들(스크랩기능)
  const [selectRoutine, setSelectRoutine] = useState([]);
  const [postRoutineId, setPostRoutineId] = useState(0);

  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("");

  const [detailRoutine, setDetailRoutine] = useState([]);

  const [nickName, setNickName] = useState("");

  const [isLiked, setIsLiked] = useState(false);

  const routineId = useParams();
  let params = routineId.id;

  const auth = `Bearer ${localStorage.getItem("token")}`;

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
        setNickName(Response.data.result.data.member.nickname);
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
  }, []);

  console.log(detailRoutine);
  console.log("내가 고른 루틴들 아이디 : ", selectRoutine);

  console.log("로드 시 찜 유무", isLiked);
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
      setButtonText("❤️");
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

  console.log(isLiked);

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
      detailRoutine.sharedContentsList.forEach((it) =>
        newRoutineId.push(it.id)
      );
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
        console.log(response);
        navigate("/feed", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
    // selectRoutine.map((it) => {
    //   const getRoutine = {
    //     id: parseInt(
    //       MyRoutineDummyData.MyRoutine[MyRoutineDummyData.MyRoutine.length - 1]
    //         .id + 1
    //     ),
    //     startTime: it.startTime,
    //     endTime: it.endTime,
    //     content: it.content,
    //   };
    //   MyRoutineDummyData.MyRoutine.push(getRoutine);
    // });
    // //일단 home으로 보내버렸음.. 나중에 모달 confirm을 사용할 수 있지 않을까요
    // navigate("/home", { replace: true });
  };

  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />
      <div className="Routine">
        {/* <img
          className="RoutineImg"
          src={require(`C:/api/image/${detailRoutine.detailThumbnail}`)}
        ></img> */}
        <br />
        <h1 className="RoutineTitle">{detailRoutine.title}</h1>
        <div style={{ textAlign: "left", marginLeft: "30px" }}>
          <input
            className="checkAll"
            type="checkbox"
            onChange={(e) => onRoutineCheckedAll(e.target.checked)}
            // checked={
            //   selectRoutine.length ==
            //   Object.keys(detailRoutine.sharedContentsList).length
            //     ? true
            //     : false
            // }
          />{" "}
          전체선택
          <button className="like_r" onClick={wishAddHandler}>
            {buttonText}
          </button>
        </div>
        {detailRoutine.sharedContentsList &&
          detailRoutine.sharedContentsList.map((it) => (
            <div className="RoutineDetail">
              <input
                className="checkbox"
                type="checkbox"
                value={it.id}
                onChange={(e) => {
                  onRoutineCheckedElement(e.target.checked, e.target.value);
                }}
                checked={selectRoutine.includes(parseInt(it.id)) ? true : false}
              />
              <span className="RoutineTime">
                <span className="RoutineStartTime">{it.startTime}</span>
                <span className="RoutineEndTime">{it.endTime}</span>
              </span>
              <span className="RoutineContent">{it.content}</span>
            </div>
          ))}
        <h2 style={{ textAlign: "left", fontSize: "35px", marginLeft: "30px" }}>
          루틴 설명
        </h2>
        <div
          style={{ fontSize: "25px", textAlign: "left", marginLeft: "30px" }}
        >
          {detailRoutine.routine_content}
        </div>
        <h2 style={{ textAlign: "left", fontSize: "35px", marginLeft: "30px" }}>
          루틴 제공자
        </h2>
        <div style={{ fontSize: "25px" }}>{nickName}</div>
        <div>
          <button className="ShareButton_sr" onClick={onPush}>
            저장하기
          </button>
        </div>
      </div>
      <MoveTab />
    </div>
  );
};

export default Routine;
