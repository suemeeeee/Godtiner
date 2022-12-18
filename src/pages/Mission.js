import { useEffect, useState } from "react";
import "./Mission.css";
import MoveTab from "../Components/MoveTab";
import axios from "axios";

const Mission = () => {
  const [clearList, setClearList] = useState([]);
  //내가 달성한 미션 들고 오기 axios 코드
  //이미지 변경하는 코드 성공하면 이 데이터 활용해서 버튼 활성화 비활성화 할 예정!
  useEffect(() => {
    axios
      .get("http://localhost:8080/mission", {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setClearList(response.data.result.data);
      });
  }, []);

  console.log(clearList);
  //버튼 클릭 시 이미지 색칠된 트로피로 변경

  //시발 왜 안돼!!!!! src 주소도 다 바뀌는데 왜 이미지가 안 바뀌냐고 ..!!!!
  function clearMission(e) {
    let missionId = e.target.id;
    console.log(missionId);
    document.getElementById(`img${missionId}`).style.display = "none";
  }

  return (
    <div>
      <h1>Mission🏆</h1>
      <div className="mission_div">
        <div className="trophy_div">
          <ul className="ul_ms">
            <li className="li_ms">
              <img
                id="img0"
                className="trophy_img trophy_1"
                src="./img/Trophy.png"
              ></img>
              <img
                id="img0_clear"
                className="trophy_img trophy_1"
                src="./img/ColorTrophy.png"
              ></img>
              <button id="1" className="trophy_text" onClick={clearMission}>
                루틴 1개 달성
              </button>
            </li>
            <li className="li_ms">
              <img className="trophy_img" src="./img/Trophy.png"></img>
              <h3 className="trophy_text">루틴 100개 달성</h3>
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
