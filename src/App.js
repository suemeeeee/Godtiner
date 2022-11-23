import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AccountEdit from "./pages/AccountEdit";
import SearchPage from "./pages/SearchPage";
import Mission from "./pages/Mission";

function App() {
  return (
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
          <Route path="/accountedit" element={<AccountEdit />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/mission" element={<Mission />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
