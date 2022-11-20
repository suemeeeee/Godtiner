import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useReducer, useRef } from "react";
import "./App.css";

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
import Feed from "./pages/Feed";
import SignupComplete from "./pages/SignupComplete";
import Mypage from "./pages/Mypage";
import ProfileEdit from "./pages/ProfileEdit";

// const reducer = (state, action) => {
//   let newRoutine = [];
//   switch (action.type) {
//     case "INIT": {
//       return action.data;
//     }
//     case "CREATE": {
//       newRoutine = [...state, action.data];
//       break;
//     }
//     case "REMOVE": {
//       newRoutine = state.filter((it) => it.id !== action.targetId);
//       break;
//     }
//     case "EDIT": {
//       newRoutine = state.map((it) =>
//         it.id === action.data.id ? { ...action.data } : it
//       );
//       break;
//     }
//     default:
//       return state;
//   }
//   return newRoutine;
// };

//개인 루틴 dummy data
// const dummyData = [
//   {
//     id: 1,
//     startTime: "08:00",
//     endTime: "08:10",
//     content: "아침 명상하기",
//   },
//   {
//     id: 2,
//     startTime: "08:15",
//     endTime: "09:00",
//     content: "기상 스트레칭 하기",
//   },
//   {
//     id: 3,
//     startTime: "09:00",
//     endTime: "09:00",
//     content: "미지근한 물 한잔 마시기",
//   },
// ];

// export const RoutineStateContext = React.createContext();
// export const RoutineDispatchContext = React.createContext();

function App() {
  // const [data, dispatch] = useReducer(reducer, dummyData);

  // const dataId = useRef(0);

  // //세부 루틴 추가하는 함수
  // const onCreate = (content, startTime, endTime) => {
  //   //알림 여부와 요일 반복도 넣어줘야 할 듯
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: dataId.current,
  //       startTime,
  //       endTime,
  //       content,
  //     },
  //   });
  //   dataId.current += 1;
  // };

  // //세부루틴 삭제
  // const onRemove = (targetId) => {
  //   dispatch({ type: "REMOVE", targetId });
  // };

  // //세부루틴 수정
  // const onEdit = (targetId, content, startTime, endTime) => {
  //   dispatch({
  //     type: "EDIT",
  //     data: {
  //       id: targetId,
  //       startTime,
  //       endTime,
  //       content,
  //     },
  //   });
  // };

  return (
    // <RoutineStateContext.Provider value={data}>
    //   <RoutineDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signupcomplete" element={<SignupComplete />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailsignup" element={<EmailSignup />} />
        </Routes>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/routine/:id" element={<Routine />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/shareroutine" element={<ShareRoutine />} />
          <Route path="/myroutineeditor/:id" element={<MyRoutineEditor />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profileedit" element={<ProfileEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
    //   </RoutineDispatchContext.Provider>
    // </RoutineStateContext.Provider>
  );
}

export default App;
