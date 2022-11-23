import React, { useContext, useState, useRef } from "react";
import { RoutineStateContext, ShareStateContext } from "../App";
import Avatar from "react-avatar-edit";
import feedDummyData from "../DummyData/feedDummyData.json";
import UserDummyData from "../DummyData/UserDummyData.json";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

import "./ShareRoutine.css";

import MyUpper from "../Components/MyUpper";
import { useNavigate } from "react-router-dom";

const ShareRoutine = () => {
  const navigate = useNavigate();
  var TagButton_sr = document.getElementsByClassName("TagButton_sr");
  function handleClick(e) {
    if (e.target.classList[0] == "clicked") {
      e.target.classList.remove("clicked");
    } else {
      for (var i = 0; i < TagButton_sr.length; i++) {
        TagButton_sr[i].classList.remove("clicked");
      }
      e.target.classList.add("clicked");
    }
  }

  function init() {
    for (var i = 0; i < TagButton_sr.length; i++) {
      TagButton_sr[i].addEventListener("click", handleClick);
    }
  }

  init();

  //이 위는 태그 버튼 클릭 시 css 버튼 색상 변경 함수
  //지금은 단일 태그로 설정해뒀지만, 배열로 바꾸면 이것도 수정 필요

  //전송할 데이터 변수
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [tag, setTag] = useState([]);
  const [content, setContent] = useState();
  const [RoutineImg, setRoutineImg] = useState();
  //체크선택 시, 내용이 들어갈 것
  const [checkedList, setCheckedList] = useState([]);
  console.log(checkedList);

  //현재 데이터 갯수에 따른 ID 지정 변수
  const nextRoutineId = useRef(3);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeIntro = (e) => {
    setIntro(e.target.value);
  };

  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  //feedDummyDate에 공유한 루틴을 추가하는 함수
  // 공유하기 버튼을 누를 시 실행
  const onPush = () => {
    const Feed_Routine = {
      RoutineId: nextRoutineId.current,
      Routiner: UserDummyData.User.UserName,
      RoutineTitle: title,
      RoutinePic: RoutineImg,
      RoutineTag: tag, //태그 배열로 바꿔야 함.. 일단 단일 태그
      RoutineIntro: intro,
      RoutineContent: [
        ["8:00", " ", "따뜻한 물 한잔 마시기"],
        ["9:00", " ", "신문기사 하나 읽기"],
        ["10:00", "10:30", "가벼운 아침 운동"],
        ["22:00", " ", "30분 책 읽기"],
      ], //임시
      Routine_like: "", //보류
      Routine_save: "",
      Routine_look: "",
    };

    feedDummyData.Feed_Routine.push(Feed_Routine);
    nextRoutineId.current += 1;

    console.log(Feed_Routine);
    //더미데이터로 전송할 객체에 데이터 제대로 들어갔는지 콘솔 출력

    console.log(feedDummyData);

    navigate("/home", { replace: true });
  };

  //아래는 썸네일 설정
  const [thumbnail, setThumbnail] = useState(UserDummyData.User.UserProfileImg); //기본 이미지
  const fileInput = useRef(null);

  const onChangeImg = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setThumbnail(UserDummyData.User.UserProfileImg); //기본 이미지
      return;
    }

    //화면에 렌더
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnail(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setRoutineImg(e.target.files[0]);
  };

  const onCheckedElement = (checked, it, value) => {
    let newRoutine = [];
    let newArr = {
      id: it.id,
      startTime: it.startTime,
      endTime: it.endTime,
      content: it.content,
    };

    if (checked) {
      setCheckedList([...checkedList, newArr]);
    } else if (!checked) {
      //setCheckedList(checkedList.filter((it) => it.id !== value));
      // const mapId = Object.values(checkedList)
      // checkedList.map((it)=> {
      //   const routineId = Object.values(it)
      //   setCheckedList(routineId.filter(v=>))
      // })
      // setCheckedList(
      //   checkedList.filter(function (rowData) {
      //     return rowData.id !== value;
      //   })
      // );
    }
  };

  // const onCheckedAll = (checked) => {
  //   if (checked) {
  //     const listArr = [];
  //     routineList.forEach((it) => listArr.push(it));
  //     setCheckedList(listArr);
  //   } else {
  //     setCheckedList([]);
  //   }
  // };

  // console.log(checkedList);

  return (
    <div>
      <MyUpper text={"루틴 공유하기"} />
      <div className="ShareRoutine">
        <div>
          <img
            className="thumbnail_sr"
            src={thumbnail}
            size={100}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={onChangeImg}
            ref={fileInput}
          />
        </div>
        <div className="RoutineTitle_sr">
          <h3 className="text_sr" style={{ textAlign: "left" }}>
            루틴 이름
          </h3>
          <input className="RoutineTitleInput_sr" onChange={onChangeTitle} />
        </div>
        <div>
          <h3 className="text_sr" style={{ textAlign: "left" }}>
            루틴 소개글
          </h3>
          <textarea
            className="IntroTextArea_sr"
            placeholder="이 루틴은 어떤 루틴인가요?"
            onChange={onChangeIntro}
          />
        </div>
        <div className="Tag_sr">
          <button value="운동" className="TagButton_sr" onClick={onChangeTag}>
            운동
          </button>
          <button value="건강" className="TagButton_sr" onClick={onChangeTag}>
            건강
          </button>
          <button value="학생" className="TagButton_sr" onClick={onChangeTag}>
            학생
          </button>
          <button value="독서" className="TagButton_sr" onClick={onChangeTag}>
            독서
          </button>
        </div>

        <div>
          <h3 className="text_sr" style={{ textAlign: "left" }}>
            공개 루틴 상세 설정
          </h3>
          {MyRoutineDummyData.MyRoutine.map((it) => (
            <div className="RoutineDetail">
              <input
                className="checkbox"
                type="checkbox"
                value={it.id}
                onChange={(e) => {
                  onCheckedElement(e.target.checked, it, e.target.value);
                }}
                checked={checkedList.some((v) => v.id === it.id) ? true : false}
              />
              <span className="RoutineTime">
                <span className="RoutineStartTime">{it.startTime}</span>
                <span className="RoutineEndTime">{it.endTime}</span>
              </span>
              <span className="RoutineContent">{it.content}</span>
            </div>
          ))}
          {/* <input
          type="checkbox"
          onChange={(e) => {
            onCheckedAll(e.target.checked);
          }}
        /> */}
          {/* {routineList.map((it) => (
          <div>
            <div>
              {it.startTime}-{it.endTime}
            </div>
            <div>{it.content}</div>

            <input
              type="checkbox"
              key={it.id}
              onChange={(e) =>
                onCheckedElement(
                  e.target.checked,
                  it.id,
                  it.startTime,
                  it.endTime,
                  it.content
                )
              }
            />
          </div>
        ))} */}
        </div>
        <button className="ShareButton_sr" onClick={onPush}>
          공유하기
        </button>
      </div>
    </div>
  );
};

export default ShareRoutine;
