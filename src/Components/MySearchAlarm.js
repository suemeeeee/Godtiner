import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/Notifications";

import feedDummyData from "../DummyData/feedDummyData.json";
import axios from "axios";

const MySearchAlarm = ({ parentFunction }) => {
  const navigate = useNavigate();

  //검색창의 검색어 변경을 다루기 위한 hooks
  const [search, setSearch] = useState("");
  //조건 일치하여 검색된 결과담는 변수 = filterData (searchPage에 props로 넘겨줌)
  const [filteredData, setFilteredData] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/feed?title=${search}`).then((response) => {
  //     console.log(response);
  //     setFilteredData(response.data.result.data.simpleLectureDtoList);
  //   });
  // }, []);

  // if (search.charAt(0) === "#") {
  //   filterData = feedDummyData.Feed_Routine.filter((p) => {
  //     return p.RoutineTag.includes(search.substring(1));
  //   });
  // } else {
  //   filterData = feedDummyData.Feed_Routine.filter((p) => {
  //     return p.RoutineTitle.includes(search);
  //   });
  // }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  //아래는 검색바 클릭 시 실행할 함수
  const onClickSearchBar = (e) => {
    navigate("/searchpage");
    console.log(search);
  };

  //아래는 검색버튼 눌렀을 때 함수
  //오류!: 두번 눌러야 반영 됨.. ㅜㅜ 왜냐고~
  const onClickSearch = (e) => {
    axios.get(`http://localhost:8080/feed?title=${search}`).then((response) => {
      console.log(response);
      setFilteredData(response.data.result.data.simpleLectureDtoList);
      //props로 SearchPage에 검색 결과 배열 넘겨 줌
      parentFunction(filteredData);
    });
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
          <Notifications onClick={() => navigate("/notification")} />
        </IconButton>
      </div>
    </div>
  );
};

export default MySearchAlarm;
