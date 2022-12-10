import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LikedTag.css";

const LikedTag = () => {
  const navigate = useNavigate();
  const [tagIdList, setTagIdList] = useState([]);
  const { state } = useLocation();
  const email = state.email;
  console.log(email);

  //get으로 태그 리스트(배열) 받아오는 api연동 코드
  useEffect(() => {
    axios.get("http://localhost:8080/tags").then((response) => {
      console.log(response);
    });
  });

  //선택 완료 버튼 클릭 시 데이터셋 보내주는 api 연동 코드
  const onClickTagComplete = () => {
    console.log(state, tagIdList);
    axios
      .post("http://localhost:8080/signUp/interest", {
        email: email,
        tagIdList: tagIdList,
      })
      .then(function (response) {
        console.log(response);
        if (response) {
          navigate("/signupcomplete");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //태그 버튼 클릭 시 실행할 함수. (보내줄 데이터 셋 tagIdList에 그 버튼 id 추가해 줌)
  const onClickTagBtn = (e) => {
    const tagId = e.target.id;
    setTagIdList([...tagIdList, tagId]);
    console.log(tagIdList);
  };
  return (
    <div>
      <h2>000님이 지금 관심있는 주제는?</h2>
      <p>최대 2개 선택</p>
      <div className="teglistDiv_lt">
        <ul className="taglist_lt">
          <li>
            <button
              id="0"
              value={"건강"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #건강
            </button>
          </li>
          <li>
            <button
              id="1"
              value={"어학"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #어학
            </button>
          </li>
          <li>
            <button
              id="2"
              value={"영어"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #영어
            </button>
          </li>
          <li>
            <button
              id="3"
              value={"일상"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #일상
            </button>
          </li>
          <li>
            <button
              id="4"
              value={"운동"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #운동
            </button>
          </li>
          <li>
            <button
              id="5"
              value={"취미"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #취미
            </button>
          </li>
          <li>
            <button
              id="6"
              value={"식단"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #식단
            </button>
          </li>
          <li>
            <button
              id="7"
              value={"공부"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #공부
            </button>
          </li>
          <li>
            <button
              id="8"
              value={"취준"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #취준
            </button>
          </li>
          <li>
            <button
              id="9"
              value={"학생"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #학생
            </button>
          </li>
          <li>
            <button
              id="10"
              value={"직장"}
              className="btn_lt"
              onClick={onClickTagBtn}
            >
              #직장
            </button>
          </li>
        </ul>
        <div className="completeBtnDiv_lt">
          <button className="completeBtn_lt" onClick={onClickTagComplete}>
            관심사 선택 완료!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedTag;
