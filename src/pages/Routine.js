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
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("🤍");
  const [isWishAdd, setIsWishAdd] = useState(false);

  const [detailRoutine, setDetailRoutine] = useState([]);
  //가져갈 루틴을 넣을 곳
  const [selectRoutine, setSelectRoutine] = useState([]);

  const params = useParams();
  const thisId = params.id;

  // useEffect(() => {
  //   if (UserDummyData.LikedRoutine.LikeId.includes(parseInt(thisId))) {
  //     setIsWishAdd(true);
  //     setButtonText("❤️");
  //   }
  // });

  //
  useEffect(() => {
    axios
      .get(`http://localhost:8080/myRoutine/post/${thisId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((Response) => {
        console.log(Response.data);
        setDetailRoutine(Response.data.result.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  console.log(detailRoutine);

  //좋아요 누르면 넘겨줄 함수 (false를 true로 바꾸고 꽉찬 하트로)
  const wishAddHandler = () => {
    if (isWishAdd === false) {
      setButtonText("❤️");
      UserDummyData.LikedRoutine.LikeId.push(thisId);
      console.log("좋아요" + UserDummyData.LikedRoutine.LikeId);
    } else {
      setButtonText("🤍");
      UserDummyData.LikedRoutine.LikeId.pop(thisId);
      console.log("좋아요" + UserDummyData.LikedRoutine.LikeId);
    }
    setIsWishAdd(!isWishAdd);
  };

  //체크박스로 루틴을 골라보자(개별ver.)
  const onRoutineCheckedElement = (checked, it, value) => {
    let getNewArr = {
      id: it.id,
      startTime: it.startTime,
      endTime: it.endTime,
      content: it.content,
    };

    if (checked) {
      setSelectRoutine([...selectRoutine, getNewArr]);
    } else {
      setSelectRoutine(
        selectRoutine.filter((it) => parseInt(it.id) !== parseInt(value))
      );
    }
  };

  //체크박스로 루틴을 모두 골라보자(allver.)
  const onRoutineCheckedAll = (checked) => {
    let newRoutine = [];
    if (checked) {
      detailRoutine.RoutineContent.forEach((it) => newRoutine.push(it));
      setSelectRoutine(newRoutine);
    } else {
      setSelectRoutine([]);
    }
  };

  //내 루틴으로 가져오는 함수
  const onPush = () => {
    selectRoutine.map((it) => {
      const getRoutine = {
        id: parseInt(
          MyRoutineDummyData.MyRoutine[MyRoutineDummyData.MyRoutine.length - 1]
            .id + 1
        ),
        startTime: it.startTime,
        endTime: it.endTime,
        content: it.content,
      };
      MyRoutineDummyData.MyRoutine.push(getRoutine);
    });

    //일단 home으로 보내버렸음.. 나중에 모달 confirm을 사용할 수 있지 않을까요
    navigate("/home", { replace: true });
  };

  return (
    <div>
      <MyUpper text={"루틴 상세페이지"} />

      <div className="Routine">
        <img
          className="RoutineImg"
          // src={require(`C:/api/image/${detailRoutine.detailThumbnail}`)}
        ></img>
        <br />
        <h1 className="RoutineTitle">{detailRoutine.RoutineTitle}</h1>
        <div style={{ textAlign: "left", marginLeft: "30px" }}>
          <input
            className="checkAll"
            type="checkbox"
            onChange={(e) => onRoutineCheckedAll(e.target.checked)}
          />{" "}
          전체선택
          <button className="like_r" onClick={wishAddHandler}>
            {buttonText}
          </button>
        </div>
        {/* {detailRoutine.sharedContentsList.map((it) => (
          <div className="RoutineDetail">
            <input
              className="checkbox"
              type="checkbox"
              value={it.id}
              onChange={(e) => {
                onRoutineCheckedElement(e.target.checked, it, e.target.value);
              }}
              checked={selectRoutine.some((v) => v.id === it.id) ? true : false}
            />
            <span className="RoutineTime">
              <span className="RoutineStartTime">{it.startTime}</span>
              <span className="RoutineEndTime">{it.endTime}</span>
            </span>
            <span className="RoutineContent">{it.content}</span>
          </div>
        ))} */}
        {/* <h2 style={{ textAlign: "left", fontSize: "35px", marginLeft: "30px" }}>
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
        <div style={{ fontSize: "25px" }}>{detailRoutine.member.nickname}</div> */}
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
