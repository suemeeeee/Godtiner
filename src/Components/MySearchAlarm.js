import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/Notifications";

import feedDummyData from "../DummyData/feedDummyData.json";

const MySearchAlarm = ({ parentFunction }) => {
  const navigate = useNavigate();
  //검색창의 검색어 변경을 다루기 위한 hooks
  const [search, setSearch] = useState("");

  //조건 일치하여 검색된 결과담는 변수 = filterData
  //검색창에 검색어 없으면 아무것도 안뜨게 수정해야 함
  // -> 굳이? 걍 다 뜨게 하지 뭐 ㅋ
  let filterData = undefined;

  if (search.charAt(0) === "#") {
    filterData = feedDummyData.Feed_Routine.filter((p) => {
      return p.RoutineTag.includes(search.substring(1));
    });
  } else {
    filterData = feedDummyData.Feed_Routine.filter((p) => {
      return p.RoutineTitle.includes(search);
    });
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  //아래는 검색바 클릭 시 실행할 함수
  const onClickSearchBar = (e) => {
    navigate("/searchpage");
  };

  //아래는 검색버튼 눌렀을 때 함수
  const onClickSearch = (e) => {
    parentFunction(filterData);
    console.log(search.charAt(0));
    //props로 SearchPage에 검색 결과 배열 넘겨 줌
  };

  return (
    <div className="MySearchAlarm">
      <div className="SearchBar">
        <InputBase
          value={search}
          onChange={onChangeSearch}
          sx={{ ml: 3, flex: 1 }}
          onClick={onClickSearchBar}
        />
        <div>
          <IconButton onClick={onClickSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="Notifications">
        <IconButton onClick={onClickSearch}>
          <Notifications />
        </IconButton>
      </div>
    </div>
  );
};

export default MySearchAlarm;
