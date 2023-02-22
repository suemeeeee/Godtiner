import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LikedTag.css";

const LikedTag = () => {
  const navigate = useNavigate();
  const [tagIdList, setTagIdList] = useState([]);
  const { state } = useLocation();
  const email = state.email;

  const [allTagList, setAllTagList] = useState([]);

  //get으로 태그 리스트(배열) 받아오는 api연동 코드
  useEffect(() => {
    axios.get("http://localhost:8080/tags").then((response) => {
      setAllTagList(response.data);
    });
  }, []);

  console.log(allTagList);

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
  // const onClickTagBtn = (e) => {
  //   const tagId = e.target.id;
  //   setTagIdList([...tagIdList, tagId]);
  //   console.log(tagIdList);

  //   if (e.target.className === "btn_lt") {
  //     e.target.className = "clickedTagBtn_lt";
  //   } else {
  //     e.target.className = "btn_lt";
  //   }
  // };
  const onClickTagBtn = (e) => {
    const tagId = parseInt(e.target.id);
    if (tagIdList.includes(parseInt(tagId))) {
      setTagIdList(tagIdList.filter((it) => parseInt(it) != parseInt(tagId)));
    } else {
      setTagIdList([...tagIdList, tagId]);
    }

    if (e.target.className === "btn_lt") {
      e.target.className = "clickedTagBtn_lt";
    } else {
      e.target.className = "btn_lt";
    }
  };
  console.log(tagIdList);

  return (
    <div className="LikedTag">
      <h1>
        신규 갓티너의 <br /> 지금 관심있는 주제는?
      </h1>
      <p>최대 2개 선택</p>

      <div className="teglistDiv_lt">
        <ul className="taglist_lt">
          {allTagList.map((it) => (
            <li className="btnLi_lt">
              <button
                id={it.id}
                value={it.tagName}
                className="btn_lt"
                onClick={onClickTagBtn}
              >
                {it.tagName}
              </button>
            </li>
          ))}
        </ul>

        <button className="completeBtn_lt" onClick={onClickTagComplete}>
          관심사 선택 완료!
        </button>
      </div>
    </div>
  );
};

export default LikedTag;
