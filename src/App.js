import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";

//페이지 라우팅
import Home from "./pages/Home";
import New from "./pages/New";
import Recommend from "./pages/Recommend";
import Routine from "./pages/Routine";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
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
          </Routes>
          <Routes>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
