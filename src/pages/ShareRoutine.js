import React, { useContext, useState, useRef, useEffect } from "react";
import { RoutineStateContext, ShareStateContext } from "../App";
import Avatar from "react-avatar-edit";
import feedDummyData from "../DummyData/feedDummyData.json";
import UserDummyData from "../DummyData/UserDummyData.json";
import MyRoutineDummyData from "../DummyData/MyRoutineDummyData.json";

import "./ShareRoutine.css";

import MyUpper from "../Components/MyUpper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShareRoutine = () => {
  //연동 실험 1번째, id값 받아오기
  //이게 약간 애매한 것이 id하나 받아올려고 useEffect를 이용해야 한다는 점
  //home에서 props로 전달하고 싶지만 home.js에서 shareRoutine.js를 import하지 못한점
  const [myRoutineId, setMyRoutineId] = useState(0);
  //연동 실험 2번째, 공유하기 페이지 구성할 때 쓸 api로 내 루틴 가져오기
  ///myRoutine/share/{id}
  const [myRoutine, setMyRoutine] = useState([]);
  const [tagList, setTagList] = useState([]);
  //연동 실험 3번째, 선택한 태그와 루틴들
  const [checkedRoutineId, setCheckedRoutineId] = useState([]);
  const [checkedTagList, setCheckedTagList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/myRoutine/post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMyRoutineId(response.data.result.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(myRoutineId);
  console.log(tagList);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/myRoutine/share/${myRoutineId}`)
      .then((response) => {
        console.log(response);
        setMyRoutine(response.data.result.data.sharedContentsSimples);
        setTagList(response.data.result.data.tagList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myRoutineId]);
  console.log("받아온 루틴", myRoutine);
  console.log("받아온 태그", tagList);
  console.log(checkedRoutineId);

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
  // console.log(checkedList);
  //console.log(tag);

  //현재 데이터 갯수에 따른 ID 지정 변수
  //id가 증가가 되지 않아서 임시로 변경
  // const nextRoutineId = useRef(3);
  const nextRoutineId =
    parseInt(
      feedDummyData.Feed_Routine[feedDummyData.Feed_Routine.length - 1]
        .RoutineId
    ) + 1;

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeIntro = (e) => {
    setIntro(e.target.value);
  };

  const onChangeTag = (e) => {
    //setTag(e.target.value);
    const tagArray = [{ id: e.target.value, tagName: e.target.name }];
    if (tagList.length < 2) {
      if (tagList.some((v) => v.id !== e.target.value)) {
        setTagList([...tagList, tagArray]);
      } else {
        setTagList(tagList.filter((it) => it.id !== e.target.value));
      }
    } else {
      return;
    }
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  //feedDummyDate에 공유한 루틴을 추가하는 함수
  // 공유하기 버튼을 누를 시 실행
  const onPush = async () => {
    //백엔드 연동시 풀어보기. 유튜브 그대로 참조함
    //e.preventDefalut();
    const Feed_Routine = {
      // RoutineId: nextRoutineId.current,
      // Routiner: UserDummyData.User.UserName,
      // RoutineTitle: title,
      // RoutinePic: RoutineImg,
      // RoutineTag: tag, //태그 배열로 바꿔야 함.. 일단 단일 태그
      // RoutineIntro: intro,
      // RoutineContent: [
      //   ["8:00", " ", "따뜻한 물 한잔 마시기"],
      //   ["9:00", " ", "신문기사 하나 읽기"],
      //   ["10:00", "10:30", "가벼운 아침 운동"],
      //   ["22:00", " ", "30분 책 읽기"],
      // ], //임시
      // Routine_like: "", //보류
      // Routine_save: "",
      // Routine_look: "",
      //RoutineId: nextRoutineId.current,
      RoutineId: nextRoutineId,
      Routiner: UserDummyData.User.UserName,
      RoutineTitle: title,
      RoutinePic: RoutineImg,
      RoutineTag: tag, //태그 배열로 바꿔야 함.. 일단 단일 태그
      RoutineIntro: intro,
      RoutineContent: checkedList,
      Routine_like: "", //보류
      Routine_save: "",
      Routine_look: "",
    };

    feedDummyData.Feed_Routine.push(Feed_Routine);
    //nextRoutineId.current += 1;

    console.log(Feed_Routine);
    //더미데이터로 전송할 객체에 데이터 제대로 들어갔는지 콘솔 출력

    //나도 써봤다 api 문장!
    //await axios.post('shareRoutines',{Feed_Routine});
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

  //개별체크
  const onCheckedElement = (checked, value) => {
    // 더미 데이터 활용시 해당 함수의 두번째 인자로 it을 추가해야 함
    // let newArr = {
    //   id: it.id,
    //   startTime: it.startTime,
    //   endTime: it.endTime,
    //   content: it.content,
    // };

    // if (checked) {
    //   setCheckedList([...checkedList, newArr]);
    // } else {
    //   setCheckedList(
    //     checkedList.filter((it) => parseInt(it.id) !== parseInt(value))
    //   );
    // }
    if (checked) {
      setCheckedRoutineId([...checkedRoutineId, parseInt(value)]);
    } else {
      setCheckedRoutineId(
        checkedRoutineId.filter((it) => parseInt(it) !== parseInt(value))
      );
    }
  };

  const onCheckedAll = (checked) => {
    // let newRoutine = [];
    if (checked) {
      //더미데이터 사용시
      // MyRoutineDummyData.MyRoutine.forEach((it) => newRoutine.push(it));
      // setCheckedList(newRoutine);
      const idArray = [];
      myRoutine.forEach((it) => idArray.push(it.id));
      setCheckedRoutineId(idArray);
    } else {
      //setCheckedList([]);
      setCheckedRoutineId([]);
    }
  };

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
        {/* <div className="Tag_sr">
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
        </div> */}
        {tagList.map((it) => (
          <span className="Tag_sr">
            <button
              value={it.id}
              name={it.tagName}
              className="TagButton_sr"
              onClick={onChangeTag}
            >
              {it.tagName}
            </button>
          </span>
        ))}

        <div>
          <h3 className="text_sr" style={{ textAlign: "left" }}>
            공개 루틴 상세 설정
          </h3>
          {/* 더미데이터 */}
          {/* <input
            className="allCheckbox"
            type="Checkbox"
            onChange={(e) => {
              onCheckedAll(e.target.checked);
            }}
            checked={
              checkedList.length == MyRoutineDummyData.MyRoutine.length
                ? true
                : false
            }
          />
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
          ))} */}
          <input
            type="checkbox"
            onChange={(e) => onCheckedAll(e.target.checked)}
            checked={checkedRoutineId.length == myRoutine.length ? true : false}
          />
          {myRoutine.map((it) => (
            <div className="RoutineDetail">
              <input
                type="checkbox"
                value={it.id}
                onChange={(e) =>
                  onCheckedElement(e.target.checked, e.target.value)
                }
                checked={
                  checkedRoutineId.includes(parseInt(it.id)) ? true : false
                }
              />
              <span className="RoutineTime">
                <span className="RoutineStartTime">{it.startTime}</span>
                <span className="RoutineEndTime">{it.endTime}</span>
              </span>
              <span className="RoutineContent">{it.content}</span>
            </div>
          ))}
        </div>
        <button className="ShareButton_sr" onClick={onPush}>
          공유하기
        </button>
      </div>
    </div>
  );
};

export default ShareRoutine;
