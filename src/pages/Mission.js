import { useState } from "react";
import "./Mission.css";
import MoveTab from "../Components/MoveTab";
import { color } from "@mui/system";
import { Instagram } from "@material-ui/icons";

const Mission = () => {
  const [trophySrc, setTrophySrc] = useState();

  function toggleImg() {
    var img_src;
    img_src = "./image/ColorTrophy.png";
    return img_src;
  }

  return (
    <div>
      <h1>Mission🏆</h1>
      <div className="mission_div">
        <div className="trophy_div">
          <ul className="ul_ms">
            <li className="li_ms">
              <img
                className="trophy_img trophy_50"
                src="./img/Trophy.png"
              ></img>
              <h3 className="trophy_text">미션 50개 달성</h3>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">미션 100개 달성</h3>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">미션 200개 달성</h3>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">미션 500개 달성</h3>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">미션 800개 달성</h3>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">미션 1000개 달성</h3>
            </li>
          </ul>
        </div>
      </div>
      <MoveTab />
    </div>
  );
};

export default Mission;
