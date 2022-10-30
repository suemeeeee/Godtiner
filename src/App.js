import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

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
          </Routes>
          <Routes>
            <Route path="/Signup" element={<Signup />}></Route>
          </Routes>
        </switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
