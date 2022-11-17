import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React, { useReducer, useRef, useState } from "react";
import "./App.css";
import MoveTab from "./Components/MoveTab"; //화면 하단의 탭이동 footer

//페이지 라우팅
import Home from "./pages/Home";
import New from "./pages/New";
import Recommend from "./pages/Recommend";
import Routine from "./pages/Routine";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ShareRoutine from "./pages/ShareRoutine";
import MyRoutineEditor from "./pages/MyRoutineEditor";
import EmailSignup from "./pages/EmailSignup";

import LoginGoogle from "./Components/LoginGoogle";

const reducer = (state, action) => {
  let newRoutine = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newRoutine = [...state, action.data];
      break;
    }
    case "REMOVE": {
      newRoutine = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newRoutine = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newRoutine;
};

//개인 루틴 dummy data
const dummyData = [
  {
    id: 1,
    startTime: "08:00",
    endTime: "08:10",
    content: "아침 명상하기",
  },
  {
    id: 2,
    startTime: "08:15",
    endTime: "09:00",
    content: "기상 스트레칭 하기",
  },
  {
    id: 3,
    startTime: "09:00",
    endTime: "09:00",
    content: "미지근한 물 한잔 마시기",
  },
];

export const RoutineStateContext = React.createContext();
export const RoutineDispatchContext = React.createContext();

//공유 루틴 context뿌리기
export const ShareRoutineContext = React.createContext();
export const ShareStateContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  //공유 데이터 dummydata, 정말 야매로 지은 것이기 때문에 구조 확정 절대 no
  const shareDummyData = [
    {
      name: "건강회복루틴",
      content: "잊혀진 우리의 건강을 위하여",
      routine: [
        {
          id: 2,
          startTime: "09:00",
          endTime: "10:00",
          s_content: "조깅",
        },
        {
          id: 3,
          startTime: "11:00",
          endTime: "12:00",
          s_content: "필라테스",
        },
      ],
    },
    {
      name: "JLPT 만점을 위하여",
      content: "JLPT N1 합격",
      routine: [
        {
          id: 1,
          startTime: "07:40",
          endTime: "07:40",
          s_name: "기상",
        },
      ],
    },
  ];
  const [shareData, setShareDate] = useState(shareDummyData);

  const dataId = useRef(0);

  //세부 루틴 추가하는 함수
  const onCreate = (content, startTime, endTime) => {
    //알림 여부와 요일 반복도 넣어줘야 할 듯
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        startTime,
        endTime,
        content,
      },
    });
    dataId.current += 1;
  };

  //세부루틴 삭제
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //세부루틴 수정
  const onEdit = (targetId, content, startTime, endTime) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        startTime,
        endTime,
        content,
      },
    });
  };

  //개인 루틴 공유하기. 구현하기 어려운 점 1번으로 인해 다시 만들어야 함
  const onShare = () => {};

  return (
    <RoutineStateContext.Provider value={data}>
      <RoutineDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        {/* 이 밑은 공유 기능을 위해 파일 전역에 공유 데이터를 뿌리기 위함임. 구조 엉성함 */}
        <ShareRoutineContext.Provider value={shareData}>
          <ShareStateContext.Provider value={onShare}>
            <BrowserRouter>
              <div className="App">
                <li>
                  <Link to="Signup">
                    <button>SignUp</button>
                  </Link>
                </li>
                <switch>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/routine/:id" element={<Routine />} />
                    <Route path="/recommend" element={<Recommend />} />
                    <Route path="/shareroutine" element={<ShareRoutine />} />
                    <Route
                      path="/myroutineeditor"
                      element={<MyRoutineEditor />}
                    />
                  </Routes>
                  <Routes>
                    <Route path="/Signup" element={<Signup />}></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/emailsignup" element={<EmailSignup />} />
                  </Routes>
                </switch>
                <MoveTab />
              </div>
            </BrowserRouter>
          </ShareStateContext.Provider>
        </ShareRoutineContext.Provider>
      </RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
}

export default App;
