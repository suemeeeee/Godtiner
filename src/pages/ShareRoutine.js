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
import { LensTwoTone } from "@mui/icons-material";

const ShareRoutine = () => {
  const navigate = useNavigate();

  //백엔드로 넘겨 줄 변수들 (항상 상단에!)
  const [myRoutineId, setMyRoutineId] = useState(0);
  const [checkedRoutineId, setCheckedRoutineId] = useState([]);
  const [checkedTagList, setCheckedTagList] = useState([]);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  //axios get으로 가져온 아이들(myRoutineId, Tag)
  const [myRoutine, setMyRoutine] = useState([]);
  const [tagList, setTagList] = useState([]);

  //myRoutineId얻어오기 위한 axios 코드
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

  //공유 페이지 구성 api axios코드
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
  }, []);

  // 여기서 부터는 태그 버튼 색 변경 코드(추후 수정)
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
  //여기까지

  //전송할 데이터 변수(필요한 것만 정리해서 위로 올려주시겠사옵니까?)
  //참고로 tag는 위에 내가 해 놓음 checkedTagList임

  //const [tag, setTag] = useState([]);
  //const [content, setContent] = useState();
  const [RoutineImg, setRoutineImg] = useState();
  //체크선택 시, 내용이 들어갈 것
  //const [checkedList, setCheckedList] = useState([]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeIntro = (e) => {
    setIntro(e.target.value);
  };

  //태그 버튼 클릭 시 checkedTagList에 해당 태그의 id와 tagname값 객체로 추가
  const onChangeTag = (e) => {
    let selectTag = { id: e.target.id, name: e.target.value };
    e.preventDefault();
    setCheckedTagList([...checkedTagList, selectTag]);
    console.log(checkedTagList);
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

  // const onChangeContent = (e) => {
  //   setContent(e.target.value);
  // };

  // 공유하기 버튼을 누를 시 실행 백엔드 연동 axios 코드
  // 쏘영쓰 부탁해유~><
  const onPush = () => {
    const frm = new FormData();
    const data = {
      title: title,
      routineContent: intro,
      myContentsIdList: checkedRoutineId,
      tagList: checkedTagList,
    };
    frm.append("files", thumbnail);
    frm.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios
      .post("http://localhost:8080/sharedRoutine/post", frm, {
        headers: {
          "Content-Type": "multipart/form-data",
          //.d
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
    // navigate("/home", { replace: true });z
  };

  //개별체크
  const onCheckedElement = (checked, value) => {
    if (checked) {
      setCheckedRoutineId([...checkedRoutineId, parseInt(value)]);
    } else {
      setCheckedRoutineId(
        checkedRoutineId.filter((it) => parseInt(it) !== parseInt(value))
      );
    }
  };

  const onCheckedAll = (checked) => {
    if (checked) {
      const idArray = [];
      myRoutine.forEach((it) => idArray.push(it.id));
      setCheckedRoutineId(idArray);
    } else {
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
        {tagList.map((it) => (
          <span className="Tag_sr">
            <button
              id={it.id}
              value={it.tagName}
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
