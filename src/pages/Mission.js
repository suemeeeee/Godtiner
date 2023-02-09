import { useEffect, useState } from "react";
import "./Mission.css";
import MoveTab from "../Components/MoveTab";
import axios from "axios";

const Mission = () => {
  const [clearList, setClearList] = useState([]);
  const [clearLength, setClearLength] = useState();

  //내가 달성한 미션 들고 오기 axios 코드
  //객체 배열 형태로 들고옴. clearList에 담아줌.
  useEffect(() => {
    axios
      .get("http://localhost:8080/mission", {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setClearList(response.data.result.data);
        setClearLength(document.getElementsByClassName("missionBtn").length);
      });
  }, []);

  function onClickBtn(e) {
    if (clearLength >= e.target.value) {
      //만약 내가 클리어한 미션리스트의 length가 클릭한 미션의 value값보다 크거나 같으면, CLEAR
      alert("미션 클리어! 앞으로도 화이팅!🎉");
      var trophyImage = document.getElementById(`mission${e.target.value}`);
      trophyImage.src = "./img/ColorTrophy.png";
    } else alert("미션을 먼저 클리어해 주세요!🏆");
  }

  return (
    <div>
      <div className="Mission">
        <h1>Mission🏆</h1>
        <h4>💙미션 달성하고, 갓생 살아보자!💙</h4>
        <div className="trophy_div">
          <ul className="ul_ms">
            <li className="li_ms">
              <img
                id="mission1"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={1} onClick={onClickBtn}>
                루틴 1개 달성
              </button>
            </li>

            <li className="li_ms">
              <img
                id="mission2"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={50} onClick={onClickBtn}>
                루틴 50개 달성
              </button>
            </li>

            <li className="li_ms">
              <img
                id="mission100"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={100} onClick={onClickBtn}>
                루틴 100개 달성
              </button>
            </li>

            <li className="li_ms">
              <img
                id="mission200"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={200} onClick={onClickBtn}>
                루틴 200개 달성
              </button>
            </li>

            <li className="li_ms">
              <img
                id="mission300"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={300} onClick={onClickBtn}>
                루틴 300개 달성
              </button>
            </li>

            <li className="li_ms">
              <img
                id="mission400"
                className="trophy_img"
                src="./img/Trophy.png"
              ></img>
              <button className="missionBtn" value={400} onClick={onClickBtn}>
                루틴 400개 달성
              </button>
            </li>
          </ul>
        </div>
      </div>
      <MoveTab />
    </div>
  );
};

export default Mission;
